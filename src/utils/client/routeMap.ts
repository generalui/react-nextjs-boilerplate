import { SidebarRoute } from 'types/Navigation'

export const routeMap: Record<
	string,
	SidebarRoute & {
		subRoutes?: Record<string, { labelKey: string }>
	}
> = {
	'': {
		href: '/',
		icon: 'HomeIcon',
		labelKey: 'common.sidebar.nav.home'
	},
	studies: {
		href: '/studies',
		icon: 'DocumentReportIcon',
		labelKey: 'common.sidebar.nav.studies',
		subRoutes: {
			'[studyId]': { labelKey: 'studies.details.title' },
			'redcap-xml': { labelKey: 'studies.redcapXMLForm.title' },
			'add-participants': { labelKey: 'studies.addParticipants.title' }
		}
	},
	profile: {
		href: '/profile',
		icon: 'CogIcon',
		labelKey: 'common.sidebar.nav.settings'
	}
}
