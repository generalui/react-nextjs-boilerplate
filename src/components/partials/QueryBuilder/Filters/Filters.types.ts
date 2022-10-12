import { CommonProps } from 'types/CommonProps'
import { FilterInput, OptionType } from 'types/QueryBuilder'

export interface FiltersProps extends CommonProps {
	fields: OptionType[]
	conditions: OptionType[]
	onChange: (filter: FilterInput, dataType?: string) => void
	initialValues?: FilterInput
	transformField?: (filter: FilterInput) => Record<string, unknown>
}
