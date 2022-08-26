import bcrypt from 'bcryptjs'
import type { NextApiResponse } from 'next'
import { ApiRequestWithFile } from 'types/ApiRequestWithFile'
import { AddParticipantsInput, ParticipantInput, Study } from 'types/index'
import { connect } from 'utils/api/connect'
import { generatePassword } from 'utils/api/generatePassword'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { handleQuery } from 'utils/api/handleQuery'
import { prisma } from 'utils/api/prisma'

const apiRoute = connect()
// const addParticipantToStudy = (participant: ParticipantInput, studyId: string) =>
// 	prisma.$transaction([
// 		prisma.user.upsert({
// 			create: {email: participant.email, role: 'participant' },
// 			update: {},
// 			where: { email: participant.email }
// 		}),
// 		prisma.user.update({
// 			where: { email: participant.email },
// 			data: { participant: { connect: { id: userId } } }
// 		}),
// 		prisma.study.update({
// 			where: { id: studyId },
// 			data: { participants: { connect: { email: participant.email } })
// 	])

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
		const createdOrConnectParticipants = await prisma.$transaction(async (prisma) => {
			const nextParticipants = await Promise.all(
				participants.map(async (participant: ParticipantInput) => {
					const password = generatePassword()

					// Create or get the user
					const user = await prisma.user.upsert({
						create: { ...participant, role: 'participant', password: bcrypt.hashSync(password, 8) },
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
									create: { participant: { connect: { id: participantUser.id } } },
									where: {
										studyId_participantId: { studyId, participantId: participantUser.id }
									}
								}
							}
						}
					})

					return {
						...user,
						password
					}
				})
			)

			return nextParticipants
		})

		return undefined
	}

	handleQuery<Study>({
		req,
		res,
		session,
		model: 'study',
		query: addParticipantsToStudyQuery
	})
})

export default apiRoute
