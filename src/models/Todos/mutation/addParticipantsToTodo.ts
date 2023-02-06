import { User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { ApiRequestWithFile } from 'types/ApiRequestWithFile'
import { AddParticipantsInput, ParticipantInput } from 'types/index'
import { generatePassword } from 'utils/api/generatePassword'
import { prisma } from 'utils/api/prisma'
import sendEmailNotification from 'utils/api/sendgrid'

// Note: leaving here as this file will be deleted soon anyway
export type CreatedOrConnectParticipantsReturns = {
	user?: User
	password?: string
	userIsAlreadyOnTodo?: boolean
	userIsAlreadyCreated?: boolean
	todo?: string
}[]

export const addParticipantsToTodo = (req: ApiRequestWithFile) => {
	return async () => {
		const { todoId } = req.query
		const { participants } = req.body as Omit<AddParticipantsInput, 'dataTypes'> & {
			dataTypes: string
		}

		if (!todoId || typeof todoId !== 'string') throw Error('Invalid todo id')

		const todo = await prisma.todo.findUnique({ where: { id: todoId } })

		if (!todo) throw Error('Todo does not exist')

		// Determine which users are already in the db
		const createdOrConnectParticipants: CreatedOrConnectParticipantsReturns =
			await prisma.$transaction(async (prisma) => {
				const nextParticipants = await Promise.all(
					participants.map(async (participant: ParticipantInput) => {
						const password = generatePassword()

						// Check if the participant is already on the todo
						const todo = await prisma.todo.findUnique({
							where: { id: todoId },
							include: {
								participants: {
									include: {
										participant: {
											include: {
												user: {
													select: {
														email: true
													}
												}
											}
										}
									}
								}
							}
						})
						if (!todo) throw Error('Todo not found')

						const userIsAlreadyOnTodo = !!todo?.participants.find(
							(p) => p.participant.user.email === participant.email
						)

						const previouslyCreatedUser = await prisma.user.findUnique({
							where: { email: participant.email }
						})

						// Create or get the user
						const user = previouslyCreatedUser
							? previouslyCreatedUser
							: await prisma.user.upsert({
									create: {
										...participant,
										role: 'participant',
										password: bcrypt.hashSync(password, 8)
									},
									update: {},
									where: { email: participant.email }
							  })

						// Return an error if the user is an admin
						if (user.role === 'admin') throw Error('User is already a Native BioData Admin')

						// Create or connect a record for the user
						const participantUser = await prisma.participant.upsert({
							create: {
								user: {
									connect: { id: user.id }
								}
							},
							update: {},
							where: { userId: user.id }
						})

						// Add the participant to the todo
						await prisma.todo.update({
							where: { id: todoId },
							data: {
								participants: {
									connectOrCreate: {
										create: {
											participant: { connect: { id: participantUser.id } }
										},
										where: {
											todoId_participantId: { todoId, participantId: participantUser.id }
										}
									}
								}
							}
						})

						return {
							user,
							password,
							userIsAlreadyOnTodo,
							userIsAlreadyCreated: !!previouslyCreatedUser,
							todo: todo?.title
						}
					})
				)

				return nextParticipants
			})

		const newlyAddedUsers = createdOrConnectParticipants.filter(
			({ userIsAlreadyOnTodo }) => !userIsAlreadyOnTodo
		)

		if (!newlyAddedUsers.length) throw Error('No new participants were added')

		// Send out emails to participants
		await Promise.all(
			newlyAddedUsers.map(async (p) => {
				if (!p.user?.email) return null

				return sendEmailNotification({
					to: p.user.email,
					from: process.env.SENDGRID_EMAIL_SENDER as string,
					templateId: 'd-a786225347a34bd4b676946f8b235ae7',
					dynamicTemplateData: {
						participantName: p.user.name,
						participantEmail: p.user.email,
						participantPassword: p.userIsAlreadyCreated
							? 'Password sent in a previous email'
							: p.password,
						todoName: todo?.title || 'General User'
					}
				})
			})
		)

		return newlyAddedUsers
	}
}
