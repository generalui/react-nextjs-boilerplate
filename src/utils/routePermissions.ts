import { Roles } from 'types/User'

type RoutePermissions = {
	[key in Roles]: string[]
}

export const routePermissions: RoutePermissions = {
	admin: [
		'/',
		'/studies',
		'/profile',
		'/studies/[studyId]',
		'/studies/[studyId]/add-participants',
		'/participants',
		'/studies/[studyId]/add-survey'
	],
	participant: ['/participant', '/participant/studies/[studyId]'],
	general: ['/auth/signin']
}
