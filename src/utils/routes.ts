import { UserRoles } from '@prisma/client'

export type Roles = keyof typeof UserRoles | 'general'

type Routes = { [key in Roles]: Record<string, string> }

export const routes: Routes = {
	admin: { home: '/', studyDetails: '/study/:studyId' },
	participant: { home: '/participant', studyDetails: '/participant/study/:studyId' },
	general: { signIn: '/auth/signin' }
}

type RoleRoutes = {
	[key in Roles]: string[]
}

export const roleRoutes = Object.entries(routes).reduce<RoleRoutes>(
	(accumulator, [key, routeMap]) => {
		return { ...accumulator, [key]: [...Object.values(routeMap)] }
	},
	{} as RoleRoutes
)
