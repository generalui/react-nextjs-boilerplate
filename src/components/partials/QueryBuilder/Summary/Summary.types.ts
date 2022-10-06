import { CommonProps } from 'types/CommonProps'
import { ApiQueryResults, QueryBuilderModels } from 'types/QueryBuilder'

export interface SummaryProps extends CommonProps {
	results?: ApiQueryResults
	model: QueryBuilderModels
	summaryModel: QueryBuilderModels
}
