import { SidebarRoute } from 'types/Navigation'

export const routeMap: Record<
	string,
	SidebarRoute & {
		subRoutes: { default: { labelKey: string } } & Record<string, { labelKey: string }>
	}
> = {
	'/': {
		href: '/',
		icon: 'HomeIcon',
		labelKey: 'common.sidebar.nav.home',
		subRoutes: { default: { labelKey: 'common.sidebar.nav.home' } }
	},
	'/studies': {
		href: '/studies',
		icon: 'DocumentReportIcon',
		labelKey: 'common.sidebar.nav.studies',
		subRoutes: { default: { labelKey: 'studies.details.title' } }
	},
	'/profile': {
		href: '/profile',
		icon: 'CogIcon',
		labelKey: 'common.sidebar.nav.settings',
		subRoutes: { default: { labelKey: 'common.sidebar.nav.settings' } }
	}
}
