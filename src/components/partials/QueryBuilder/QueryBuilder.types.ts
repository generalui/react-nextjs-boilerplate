import { CommonProps } from 'types/CommonProps'
import { ConditionInput, OptionType, QueryBuilderModel } from 'types/QueryBuilder'

export interface QueryBuilderProps extends CommonProps {
	fields: OptionType[]
	transformField?: (field: ConditionInput) => Record<string, unknown>
	conditions: OptionType[]
	model: QQueryBuilderModel	summaryModel: QQueryBuilderModel}
