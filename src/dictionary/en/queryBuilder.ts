const queryBuilder = {
	conditions: {
		equals: { label: { message: 'Equals' } },
		not: { label: { message: 'Not Equals' } },
		contains: { label: { message: 'Contains' } },
		startsWith: { label: { message: 'Starts With' } },
		lt: { label: { message: 'Before' } },
		gt: { label: { message: 'After' } },
		has: { label: { message: 'Has' } },
		notIncludes: { label: { message: 'Does Not Include' } }
	},

	filters: {
		title: { message: 'Filters' },
		fields: {
			message: 'Field'
		},
		condition: {
			message: 'Condition'
		},
		value: {
			message: 'Value'
		}
	},
	summary: {
		title: { message: 'Filter Summary' },
		export: {
			message: 'Export'
		}
	},
	models: {
		participant: {
			singular: { message: 'Participant' },
			plural: { message: 'Participants' }
		},
		study: {
			singular: { message: 'Study' },
			plural: { message: 'Studies' }
		}
	}
}

export default queryBuilder
