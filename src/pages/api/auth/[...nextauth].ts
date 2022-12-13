import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { User } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import bcrypt from 'bcryptjs'
import ldap from 'ldapjs'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { Credentials } from 'types/Credentials'
import { prisma } from 'utils/api/prisma'
import { maxAge } from 'utils/constants'

// You might want to pull this call out so we're not making a new LDAP client on every login attemp
const client =
	process.env.LDAP_URI && process.env.NEXT_PUBLIC_LOGIN_WITH_LDAP === 'true'
		? ldap.createClient({
				url: process.env.LDAP_URI
		  })
		: null

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	// Custom page routes for auth
	pages: {
		signIn: '/auth/signin',
		error: '/auth/signin'
	},
	session: {
		// Choose how you want to save the user session.
		// The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
		// If you use an `adapter` however, we default it to `"database"` instead.
		// You can still force a JWT session by explicitly defining `"jwt"`.
		// When using `"database"`, the session cookie will only contain a `sessionToken` value,
		// which is used to look up the session in the database.
		strategy: 'jwt',

		// Seconds - How long until an idle session expires and is no longer valid.
		maxAge
	},
	providers: [
		process.env.NEXT_PUBLIC_LOGIN_WITH_LDAP === 'true'
			? CredentialsProvider({
					// The name to display on the sign in form (e.g. "Sign in with...")
					name: 'LDAP',
					// The credentials is used to generate a suitable form on the sign in page.
					// You can specify whatever fields you are expecting to be submitted.
					// e.g. domain, username, password, 2FA token, etc.
					// You can pass any HTML attribute to the <input> tag through the object.
					credentials: {
						email: { label: 'Email', type: 'email', placeholder: 'example@email.com' },
						password: { label: 'Password', type: 'password' }
					},
					async authorize(credentials) {
						// Add logic here to look up the user from the credentials supplied
						// const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
						// const { email, password, createAccount } = credentials as Credentials
						// let user: User | null

						const { email, password } = credentials as Credentials

						// Essentially promisify the LDAPJS client.bind function
						return new Promise((resolve, reject) => {
							if (!client) {
								reject(new Error('LDAP not configured'))
								return
							}

							client.bind(email, password, (error) => {
								if (error) {
									console.error('LDAP Failed', error)
									reject(error)
								} else {
									console.log('LDAP Logged in', email, password)
									resolve({
										username: email,
										password: password
									})
								}
							})
						})
					}
			  })
			: CredentialsProvider({
					// The name to display on the sign in form (e.g. "Sign in with...")
					name: 'Credentials',
					// The credentials is used to generate a suitable form on the sign in page.
					// You can specify whatever fields you are expecting to be submitted.
					// e.g. domain, username, password, 2FA token, etc.
					// You can pass any HTML attribute to the <input> tag through the object.
					credentials: {
						email: { label: 'Email', type: 'email', placeholder: 'example@email.com' },
						password: { label: 'Password', type: 'password' }
					},
					async authorize(credentials) {
						// Add logic here to look up the user from the credentials supplied
						// const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
						const { email, password, createAccount } = credentials as Credentials
						let user: User | null
						// Create user
						if (createAccount) {
							try {
								const hashedPassword = await bcrypt.hash(password, 10)
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
						// Sign in user
						else {
							user = await prisma.user.findFirst({
								where: { email }
							})

							if (user && user.password) {
								const match = await bcrypt.compare(password, user.password)

								// Any object returned will be saved in `user` property of the JWT
								return match ? user : null
							} else {
								// If you return null then an error will be displayed advising the user to check their details.
								return null

								// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
							}
						}
					}
			  })
	],
	callbacks: {
		async redirect({ url, baseUrl }) {
			// Allows relative callback URLs
			if (url.startsWith('/')) return `${baseUrl}${url}`
			// Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) return url

			return baseUrl
		},
		async jwt({ token, account, user }) {
			// Persist the OAuth access_token to the token right after signin
			if (account) {
				token.id = account.providerAccountId
				token.error = account.error
				token.role = user?.role
			}

			return token
		},
		async session({ session, token }) {
			// Send properties to the client, like an access_token from a provider.
			if (token) {
				session.userId = token.id
				session.error = token.error
				session.role = token.role
			}
			return session
		}
	}
})
