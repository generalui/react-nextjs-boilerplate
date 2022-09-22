import { CommonProps } from 'types/CommonProps'
import { ConditionInput, OptionType } from 'types/QueryBuilder'

export interface FiltersProps extends CommonProps {
	fields: OptionType[]
	conditions: OptionType[]
	onFiltersChange: (filter: ConditionInput) => void
}
