import { CommonProps } from 'types/CommonProps'
import {
	FilterInput,
	FilterInputWithModel,
	OptionType,
	QueryBuilderModel
} from 'types/QueryBuilder'
import { ItemsSelect } from 'common/SelectInput/SelectInput.types'

export interface FiltersProps extends CommonProps {
	fields: OptionType[]
	conditions: OptionType[]
	filterTypes: ItemsSelect
	onChange: (filter: FilterInputWithModel[], model?: QueryBuilderModel, dataType?: string) => void
	initialValues?: FilterInput
	initialDataType?: string
	transformField?: (filter: FilterInput) => Record<string, unknown>
}
