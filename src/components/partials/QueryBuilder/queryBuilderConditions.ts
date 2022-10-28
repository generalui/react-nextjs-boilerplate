import { QueryInputType } from 'types/QueryBuilder'

export const queryBuilderConditions = {
	equals: {
		label: { key: 'conditions.equals.label' },
		allowedFieldTypes: [QueryInputType.text, QueryInputType.date, QueryInputType.select]
	},
	not: {
		label: { key: 'conditions.not.label' },
		allowedFieldTypes: [QueryInputType.text, QueryInputType.date]
	},
	contains: {
		label: { key: 'conditions.contains.label' },
		allowedFieldTypes: [QueryInputType.text]
	},
	startsWith: {
		label: { key: 'conditions.startsWith.label' },
		allowedFieldTypes: [QueryInputType.text]
	},
	lt: {
		label: { key: 'conditions.lt.label' },
		allowedFieldTypes: [QueryInputType.date]
	},
	gt: {
		label: { key: 'conditions.gt.label' },
		allowedFieldTypes: [QueryInputType.date]
	},
	has: {
		label: { key: 'conditions.includes.label' },
		allowedFieldTypes: [QueryInputType.select]
	},
	excludes: {
		label: { key: 'conditions.excludes.label' },
		allowedFieldTypes: [QueryInputType.select]
	}
}

export const queryBuilderFilterTypes = {
	and: { key: 'filterTypes.and' },
	or: { key: 'filterTypes.or' },
	not: { key: 'filterTypes.not' }
}
