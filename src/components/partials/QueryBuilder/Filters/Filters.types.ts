import { CommonProps } from 'types/CommonProps'
import { FilterInput, OptionType, QueryBuilderModel } from 'types/QueryBuilder'

export interface FiltersProps extends CommonProps {
	fields: OptionType[]
	conditions: OptionType[]
	onChange: (filter: FilterInput, model?: QueryBuilderModel, dataType?: string) => void
	initialValues?: FilterInput
	initialDataType?: string
	transformField?: (filter: FilterInput) => Record<string, unknown>
}
