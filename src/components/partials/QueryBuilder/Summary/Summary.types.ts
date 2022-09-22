import { CommonProps } from 'types/CommonProps'
import { QueryBuilderModels, QueryResults } from 'types/QueryBuilder'

export interface SummaryProps extends CommonProps {
	results?: QueryResults
	model: QueryBuilderModels
	summaryModel: QueryBuilderModels
}
