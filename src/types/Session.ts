import { Session as NextAuthSession } from 'next-auth'

export interface Session extends NextAuthSession {
	userId: string
}
