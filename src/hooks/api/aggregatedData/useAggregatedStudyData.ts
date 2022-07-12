import { UseQueryResult, useQuery } from 'react-query'
import { getAggregatedStudyData } from 'utils/requests/studies'

export const useAggregatedStudyData = (): UseQueryResult<
	Awaited<ReturnType<typeof getAggregatedStudyData>>,
	unknown
> => {
	const query = useQuery('aggregated-study-data', getAggregatedStudyData)
	return query
}
