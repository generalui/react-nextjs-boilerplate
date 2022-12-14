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
		'/studies/[studyId]/add-survey',
		'/settings/update-password',
		'/export-data'
	],
	participant: ['/participant', '/participant/studies/[studyId]', '/settings/update-password'],
	general: ['/auth/signin']
}
