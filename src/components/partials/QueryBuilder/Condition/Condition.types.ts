import { CommonProps } from 'types/CommonProps'
import { OptionType, QueryBuilderModel } from 'types/QueryBuilder'

export interface ConditionProps extends CommonProps {
	fields: OptionType[]
	conditions: OptionType[]
	onFieldTypeChange: (fieldDataType?: string) => void
	onModelChange: (model?: QueryBuilderModel) => void
}
