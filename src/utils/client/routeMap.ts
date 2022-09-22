import { SidebarRoute } from 'types/Navigation'

export const routeMap: Record<
	string,
	SidebarRoute & {
		subRoutes?: Record<string, { href?: string; labelKey: string }>
	}
> = {
	'': {
		href: '/',
		icon: 'HomeIcon',
		labelKey: 'common.sidebar.nav.home',
		role: 'admin'
	},
	participant: {
		href: '/participant',
		icon: 'HomeIcon',
		labelKey: 'common.sidebar.nav.home',
		role: 'participant',
		subRoutes: {
			studies: { labelKey: 'common.sidebar.nav.studies', href: '/participant' },
			'[studyId]': { labelKey: 'studies.details.title' }
		}
	},
	studies: {
		href: '/studies',
		icon: 'DocumentChartBarIcon',
		labelKey: 'common.sidebar.nav.studies',
		subRoutes: {
			'[studyId]': { labelKey: 'studies.details.title' },
			'redcap-xml': { labelKey: 'studies.redcapXMLForm.title' },
			'add-participants': { labelKey: 'studies.addParticipants.title' }
		},
		role: 'admin'
	},
	participants: {
		href: '/participants',
		icon: 'UserGroupIcon',
		labelKey: 'common.sidebar.nav.participants',
		role: 'admin'
	}
}
