import { CommonProps } from 'types/CommonProps'
import { QueryBuilderModels, QueryResults } from 'types/QueryBuilder'

export interface ResultsProps extends CommonProps {
	results?: QueryResults['list']
	model: QueryBuilderModels
	summaryModel: QueryBuilderModels
}
