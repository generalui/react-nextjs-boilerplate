import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { studies, users } from './seedData'

const prisma = new PrismaClient()
type CreatedUser = {
	email: string
	name: string
	password: string
	id?: string
}
// Keep track of created users without hashed password
const createdUsers: CreatedUser[] = []

// Format seed users for prisma insertion
const prismaSafeTestUsers = users.map(
	// 'P1.' as a prefix was the easiest way to add a number and special character  to the generated password
	({ email, name, password = faker.internet.password(8, false, /[A-z 0-9]/, 'P1.'), id }) => {
		createdUsers.push({ email, name, password, id })
		return {
			where: { email },
			update: {},
			create: { email, name, password: bcrypt.hashSync(password, 8), id }
		}
	}
)

// Format seed studies for prisma insertion
const prismaSafeStudies = studies.map(({ imageUrl, ...study }) => {
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

	const studiesCount = await prisma.study.count({})
	if (studiesCount === 0) {
		const createdStudies = await Promise.all(
			prismaSafeStudies.map((study) => prisma.study.create(study))
		)
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
