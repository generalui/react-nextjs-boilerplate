export const queryBuilderConditions = {
	equals: {
		label: { key: 'conditions.equals.label' },
		allowedFieldTypes: ['text', 'date', 'select']
	},
	not: {
		label: { key: 'conditions.not.label' },
		allowedFieldTypes: ['text', 'date']
	},
	contains: {
		label: { key: 'conditions.contains.label' },
		allowedFieldTypes: ['text']
	},
	startsWith: {
		label: { key: 'conditions.startsWith.label' },
		allowedFieldTypes: ['text']
	},
	lt: {
		label: { key: 'conditions.lt.label' },
		allowedFieldTypes: ['date']
	},
	gt: {
		label: { key: 'conditions.gt.label' },
		allowedFieldTypes: ['date']
	}
}
