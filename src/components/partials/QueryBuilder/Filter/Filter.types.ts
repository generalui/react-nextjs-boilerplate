import { CommonProps } from 'types/CommonProps'
import { FilterInputWithModel, OptionType, QueryBuilderModel } from 'types/QueryBuilder'
import { ItemsSelect } from 'common/SelectInput/SelectInput.types'

export interface FilterProps extends CommonProps {
	fields: OptionType[]
	conditions: OptionType[]
	filterTypes: ItemsSelect
	onFieldTypeChange: (fieldDataType?: string) => void
	onModelChange: (model?: QueryBuilderModel) => void
	updateFiltersArray: (filters: FilterInputWithModel, key: string) => void
	filterKey: string
	firstItem?: boolean
}
