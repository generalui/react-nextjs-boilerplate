import { InputType } from 'types/QueryBuilder'

export const queryBuilderConditions = {
	equals: {
		label: { key: 'conditions.equals.label' },
		allowedFieldTypes: [InputType.TEXT, InputType.DATE, InputType.SELECT]
	},
	not: {
		label: { key: 'conditions.not.label' },
		allowedFieldTypes: [InputType.TEXT, InputType.DATE]
	},
	contains: {
		label: { key: 'conditions.contains.label' },
		allowedFieldTypes: [InputType.TEXT]
	},
	startsWith: {
		label: { key: 'conditions.startsWith.label' },
		allowedFieldTypes: [InputType.TEXT]
	},
	lt: {
		label: { key: 'conditions.lt.label' },
		allowedFieldTypes: [InputType.DATE]
	},
	gt: {
		label: { key: 'conditions.gt.label' },
		allowedFieldTypes: [InputType.DATE]
	},
	has: {
		label: { key: 'conditions.has.label' },
		allowedFieldTypes: [InputType.SELECT]
	},
	notIncludes: {
		label: { key: 'conditions.notIncludes.label' },
		allowedFieldTypes: [InputType.SELECT]
	}
}
