import { UseQueryResult, useQuery } from 'react-query'
import { Study } from 'types/Study'
import { getStudies } from 'utils/requests/studies'

export type UseStudies = (scope?: string) => Omit<
	UseQueryResult<Awaited<ReturnType<typeof getStudies>>, unknown>,
	'data'
> & {
	studies?: Study[]
}

export const useStudies: UseStudies = (scope) => {
	const { data: studies, ...query } = useQuery(`studies${scope ? '-' + scope : ''}`, () => {
		return getStudies(scope === 'new' ? '?new=true' : undefined)
	})
	return { studies, ...query }
}
