import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { studies, users } from './seedData'

const prisma = new PrismaClient()

// Format seed users for prisma insertion
const prismaSafeTestUsers = users.map(({ email, name, password }) => ({
	where: { email },
	update: {},
	create: {
		email,
		name,
		password: bcrypt.hashSync(password, 10)
	}
}))

async function main() {
	const createdUsers = await Promise.all(
		prismaSafeTestUsers.map((user) => prisma.user.upsert(user))
	)
	console.log(createdUsers)

	const createdStudies = await Promise.all(
		studies.map(({ imageUrl, ...study }) =>
			prisma.study.create({
				data: {
					...study,
					image: imageUrl
						? {
								create: {
									name: imageUrl,
									url: imageUrl,
									fileType: 'mimetype'
								}
						  }
						: undefined
				}
			})
		)
	)
	console.log(createdStudies)
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
