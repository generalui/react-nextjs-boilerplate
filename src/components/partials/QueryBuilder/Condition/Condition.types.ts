import { CommonProps } from 'types/CommonProps'
import { OptionType, QueryBuilderModel } from 'types/QueryBuilder'
import { ItemsSelect } from 'common/SelectInput/SelectInput.types'

export interface ConditionProps extends CommonProps {
	fields: OptionType[]
	conditions: OptionType[]
	filterTypes: ItemsSelect
	onFieldTypeChange: (fieldDataType?: string) => void
	onModelChange: (model?: QueryBuilderModel) => void
}
