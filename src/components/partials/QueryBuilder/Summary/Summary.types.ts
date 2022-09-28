import { CommonProps } from 'types/CommonProps'
import { ApiQueryResults, QueryBuilderModel } from 'types/QueryBuilder'

export interface SummaryProps extends CommonProps {
	results?: ApiQueryResults
	model: QueryBuilderModel
	summaryModel: QueryBuilderModel
}
