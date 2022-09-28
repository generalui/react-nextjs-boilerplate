import { CommonProps } from 'types/CommonProps'
import { ApiQueryResults, QueryBuilderModel } from 'types/QueryBuilder'

export interface ResultsProps extends CommonProps {
	results?: ApiQueryResults['list']
	model: QueryBuilderModel
	summaryModel: QueryBuilderModel
}
