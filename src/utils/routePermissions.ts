import { UserRoles } from '@prisma/client'

export type Roles = keyof typeof UserRoles | 'general'

type RoutePermissions = {
	[key in Roles]: string[]
}

export const routePermissions: RoutePermissions = {
	admin: ['/', '/studies', '/profile', '/studies/[studyId]', '/studies/[studyId]/add-participants'],
	participant: ['/participant', '/participant/studies/[studyId]'],
	general: ['/auth/signin']
}
