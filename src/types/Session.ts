import { Session as NextAuthSession } from 'next-auth'
import { Roles } from 'utils/routePermissions'

export interface Session extends NextAuthSession {
	userId: string
	role: Roles
}
