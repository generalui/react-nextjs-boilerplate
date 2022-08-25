import { User } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import bcrypt from 'bcryptjs'
import { Credentials } from 'types/Credentials'
import { prisma } from 'utils/api/prisma'

const SALT_ROUNDS = 10

export type CreateUser = ({ email, password }: Credentials) => Promise<User | null>

export const createUser: CreateUser = async ({ email, password }) => {
	try {
		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
		const user = await prisma.user.create({
			data: { email, password: hashedPassword, role: 'admin' }
		})

		if (user) {
			// Any object returned will be saved in `user` property of the JWT
			return user
		} else {
			// If you return null then an error will be displayed advising the user to check their details.
			return null

			// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
		}
	} catch (err) {
		if ((err as PrismaClientKnownRequestError).code === 'P2002')
			throw new Error('UserAlreadyExists')
		else throw err
	}
}
