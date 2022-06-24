import { UseQueryResult, useQuery } from 'react-query'
import { getStudy } from 'utils/api/studies'

export const useStudy = (
	studyId: string
): UseQueryResult<Awaited<ReturnType<typeof getStudy>>, unknown> => {
	const query = useQuery(`study-${studyId}`, () => getStudy(studyId))
	return query
}
