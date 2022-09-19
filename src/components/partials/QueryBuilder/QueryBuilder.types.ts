import { CommonProps } from 'types/CommonProps'
import { OptionType, QueryBuilderModels } from 'types/QueryBuilder'

export interface QueryBuilderProps extends CommonProps {
	fields: OptionType[]
	conditions: OptionType[]
	model: QueryBuilderModels
}
