import { UseQueryResult, useQuery } from 'react-query'
import { QueryOptions, Study } from 'types/index'
import { getParticipantStudies } from 'utils/requests/studies'

export type UseParticipantStudies = (
	participantId?: string,
	queryOptions?: QueryOptions
) => Omit<UseQueryResult<Awaited<ReturnType<typeof getParticipantStudies>>, unknown>, 'data'> & {
	studies?: Study[]
	count?: number
	hasMore?: boolean
}

export const useParticipantStudies: UseParticipantStudies = (participantId, queryOptions) => {
	const { data, ...query } = useQuery(
		['studies', queryOptions?.page, queryOptions?.pageSize],
		() => getParticipantStudies(participantId || '', queryOptions),
		{
			enabled: !!participantId,
			keepPreviousData: true
		}
	)

	return { ...data, ...query }
}
