export const routes = {
	admin: { home: '/', studyDetails: '/study/:studyId' },
	participant: { home: '/participant', studyDetails: '/participant/study/:studyId' },
	general: { signIn: '/auth/signin' }
}

type RoleRoutes = {
	[key in keyof typeof routes]: string[]
}

export const roleRoutes = Object.entries(routes).reduce<RoleRoutes>(
	(accumulator, [key, routeMap]) => {
		return { ...accumulator, [key]: [...Object.values(routeMap)] }
	},
	{} as RoleRoutes
)
