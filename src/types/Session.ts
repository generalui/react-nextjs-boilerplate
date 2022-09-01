import { Session as NextAuthSession } from 'next-auth'
import { Roles } from 'types/User'

export interface Session extends NextAuthSession {
	userId: string
	role: Roles
}
