import { Roles } from 'types/User'

type RoutePermissions = {
	[key in Roles]: string[]
}

export const routePermissions: RoutePermissions = {
	admin: ['/', '/studies', '/profile', '/studies/[studyId]', '/studies/[studyId]/add-participants'],
	participant: ['/participant', '/participant/studies/[studyId]'],
	general: ['/auth/signin']
}
