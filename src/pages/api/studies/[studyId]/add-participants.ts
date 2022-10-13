import { ConsentEnum, StudyDataType, User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import type { NextApiResponse } from 'next'
import { ApiRequestWithFile } from 'types/ApiRequestWithFile'
import { AddParticipantsInput, ParticipantInput, Study } from 'types/index'
import { connect } from 'utils/api/connect'
import { generatePassword } from 'utils/api/generatePassword'
import { getDefaultConsentFromStudy } from 'utils/api/getDefaultConsentFromStudy'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { handleQuery } from 'utils/api/handleQuery'
import { prisma } from 'utils/api/prisma'
import sendEmailNotification from 'utils/api/sendgrid'

const apiRoute = connect()

export type CreatedOrConnectParticipantsReturns = {
	user?: User
	password?: string
	userIsAlreadyOnStudy?: boolean
	userIsAlreadyCreated?: boolean
	study?: string
}[]

// Bulk upload participants to study
apiRoute.put(async (req: ApiRequestWithFile, res: NextApiResponse) => {
	const session = await getSessionFromReq(req)
	const { studyId } = req.query
	const { participants } = req.body as Omit<AddParticipantsInput, 'dataTypes'> & {
		dataTypes: string
	}

	const addParticipantsToStudyQuery = async () => {
		if (!studyId || typeof studyId !== 'string') throw Error('Invalid study id')

		const study = await prisma.study.findUnique({ where: { id: studyId } })

		if (!study) throw Error('Study does not exist')

		// Determine which users are already in the db
		const createdOrConnectParticipants: CreatedOrConnectParticipantsReturns =
			await prisma.$transaction(async (prisma) => {
				const nextParticipants = await Promise.all(
					participants.map(async (participant: ParticipantInput) => {
						const password = generatePassword()

						// Check if the participant is already on the study
						const study = await prisma.study.findUnique({
							where: { id: studyId },
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
						if (!study) throw Error('Study not found')

						const userIsAlreadyOnStudy = !!study?.participants.find(
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

						// Add the participant to the study
						await prisma.study.update({
							where: { id: studyId },
							data: {
								participants: {
									connectOrCreate: {
										create: {
											participant: { connect: { id: participantUser.id } },
											consent: {
												create: {
													analyses: getDefaultConsentFromStudy(study, 'analyses'),
													geneticData: getDefaultConsentFromStudy(study, 'geneticData'),
													healthRecords: getDefaultConsentFromStudy(study, 'healthRecords'),
													specimens: getDefaultConsentFromStudy(study, 'specimens')
												}
											}
										},
										where: {
											studyId_participantId: { studyId, participantId: participantUser.id }
										}
									}
								}
							}
						})

						return {
							user,
							password,
							userIsAlreadyOnStudy,
							userIsAlreadyCreated: !!previouslyCreatedUser,
							study: study?.title
						}
					})
				)

				return nextParticipants
			})

		const newlyAddedUsers = createdOrConnectParticipants.filter(
			({ userIsAlreadyOnStudy }) => !userIsAlreadyOnStudy
		)

		if (!newlyAddedUsers.length) throw Error('No new participants were added')

		console.log(
			'createdOrConnectParticipants ~ createdOrConnectParticipants',
			createdOrConnectParticipants
		)

		// Send out emails to participants
		const emailsSent = await Promise.all(
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
						studyName: study?.title || 'General User'
					}
				})
			})
		)

		console.log('addParticipantsToStudyQuery ~ emailsSent', emailsSent)
		return undefined
	}

	handleQuery<Study>({
		req,
		res,
		session,
		model: 'study',
		role: 'admin',
		query: addParticipantsToStudyQuery
	})
})

export default apiRoute
