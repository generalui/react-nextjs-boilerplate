import { CommonProps } from 'types/CommonProps'
import { ApiQueryResults, QueryBuilderModels } from 'types/QueryBuilder'

export interface ResultsProps extends CommonProps {
	results?: ApiQueryResults['list']
	model: QueryBuilderModels
	summaryModel: QueryBuilderModels
}
