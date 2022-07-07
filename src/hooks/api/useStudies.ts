import { UseQueryResult, useQuery } from 'react-query'
import { getStudies } from 'utils/requests/studies'

export const useStudies = (): UseQueryResult<Awaited<ReturnType<typeof getStudies>>, unknown> => {
	const query = useQuery('studies', getStudies)
	return query
}
