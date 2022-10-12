import { faker } from '@faker-js/faker'
import { ConsentEnum, PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { getDefaultConsentFromStudy } from 'utils/api/getDefaultConsentFromStudy'
import { participants, studies, users } from './seedData'

const prisma = new PrismaClient()
type CreatedUser = {
	email: string
	name: string
	password: string
	id?: string
	role: 'admin' | 'participant'
}
// Keep track of created users without hashed password
const createdUsers: CreatedUser[] = []

// Format seed users for prisma insertion
const prismaSafeTestUsers = users.map(
	// 'P1.' as a prefix was the easiest way to add a number and special character  to the generated password
	({ email, name, password = faker.internet.password(8, false, /[A-z 0-9]/, 'P1.'), id, role }) => {
		createdUsers.push({ email, name, password, id, role })
		return {
			where: { email },
			update: {},
			create: { email, name, password: bcrypt.hashSync(password, 8), id, role }
		}
	}
)

// Format seed users for prisma insertion
const prismaSafeParticipants = (participants || []).map((participant) => {
	return {
		where: { userId: participant.userId },
		update: {},
		create: { ...participant }
	}
})

// Format seed studies for prisma insertion
const prismaSafeStudiesWithParticipant = studies.slice(0, 1).map(({ imageUrl, ...study }) => {
	return {
		data: {
			...study,
			image: imageUrl
				? {
						create: {
							image: {
								create: {
									name: imageUrl,
									url: imageUrl,
									fileType: 'mimetype'
								}
							}
						}
				  }
				: undefined,
			participants: {
				connectOrCreate: {
					where: {
						studyId_participantId: {
							studyId: study.id,
							participantId: 'participant1'
						}
					},
					create: {
						participant: {
							connect: { id: 'participant1' }
						},
						consent: {
							create: {
								analyses: ConsentEnum.no,
								geneticData: ConsentEnum.yes,
								healthRecords: ConsentEnum.yes,
								specimens: ConsentEnum.yes
							}
						}
					}
				}
			}
		}
	}
})

const prismaSafeStudiesWithoutParticipants = studies.slice(1).map(({ imageUrl, ...study }) => {
	return {
		data: {
			...study,
			image: imageUrl
				? {
						create: {
							image: {
								create: {
									name: imageUrl,
									url: imageUrl,
									fileType: 'mimetype'
								}
							}
						}
				  }
				: undefined
		}
	}
})

// Seed the database
async function main() {
	await Promise.all(prismaSafeTestUsers.map((user) => prisma.user.upsert(user)))
	console.log('Created users:\n', createdUsers)

	const createParticipants = await Promise.all(
		prismaSafeParticipants.map((participant) => prisma.participant.upsert(participant))
	)

	console.log('Created participants:\n', createParticipants?.length)

	const studiesCount = await prisma.study.count({})
	if (studiesCount === 0) {
		const createdStudiesWithParticipants = await Promise.all(
			prismaSafeStudiesWithParticipant.map((study) => prisma.study.create(study))
		)

		const createdStudiesWithoutParticipants = await Promise.all(
			prismaSafeStudiesWithoutParticipants.map((study) => prisma.study.create(study))
		)

		const createdStudies = [...createdStudiesWithoutParticipants, ...createdStudiesWithParticipants]

		console.log('Created studies:\n', createdStudies?.length)
	}
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
