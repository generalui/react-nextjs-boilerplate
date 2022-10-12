import { CommonProps } from 'types/CommonProps'
import { ApiQueryResults } from 'types/QueryBuilder'
import { AggregatedDataCardProps } from 'partials/AggregatedDataCard/AggregatedDataCard.types'

export interface SummaryProps extends CommonProps {
	results?: ApiQueryResults
	dataSummaryCards: AggregatedDataCardProps[]
}
