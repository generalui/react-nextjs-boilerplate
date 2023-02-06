// TODO: move this file
import { Roles } from 'types/User'

type RoutePermissions = {
	[key in Roles]: string[]
}

export const routePermissions: RoutePermissions = {
	admin: [
		'/',
		'/todos',
		'/profile',
		'/todos/[todoId]',
		'/todos/[todoId]/add-participants',
		'/participants',
		'/settings/update-password',
		'/export-data'
	],
	participant: ['/participant', '/participant/todos/[todoId]', '/settings/update-password'],
	general: ['/auth/signin']
}
