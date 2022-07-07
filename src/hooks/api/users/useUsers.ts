import { UseQueryResult, useQuery } from 'react-query'
import { getUsers } from 'utils/requests/users'

export const useUsers = (): UseQueryResult<Awaited<ReturnType<typeof getUsers>>, unknown> => {
	const query = useQuery('users', getUsers)
	return query
}
