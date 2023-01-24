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
			todos: { labelKey: '', href: '/participant' },
			'[todoId]': { labelKey: 'todos.details.title' }
		}
	},
	todos: {
		href: '/todos',
		icon: 'DocumentChartBarIcon',
		labelKey: 'common.sidebar.nav.todos',
		subRoutes: {
			'[todoId]': { labelKey: 'todos.details.title' },
			'redcap-xml': { labelKey: 'todos.redcapXMLForm.title' },
			'add-participants': { labelKey: 'todos.addParticipants.title' },
			'add-survey': { labelKey: 'todos.addSurvey.title' }
		},
		role: 'admin'
	},
	participants: {
		href: '/participants',
		icon: 'UserGroupIcon',
		labelKey: 'common.sidebar.nav.participants',
		role: 'admin'
	},
	exportData: {
		href: '/export-data',
		icon: 'DocumentArrowDownIcon',
		labelKey: 'common.sidebar.nav.exportData',
		role: 'admin'
	},
	settings: {
		icon: 'CogIcon',
		href: '/settings',
		labelKey: 'common.sidebar.nav.settings',
		role: 'general',
		className: 'border-t-2',
		dropdownItems: [
			{
				label: 'Update Password', //TODO: add translation
				value: 'updatePassword',
				href: '/settings/update-password'
			}
		]
	}
}
