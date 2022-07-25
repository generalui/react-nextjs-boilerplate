import { UseQueryResult, useQuery } from 'react-query'
import { User } from 'types/User'
import { getUsers } from 'utils/requests/users'

type UseUsersReturn = Omit<
	UseQueryResult<Awaited<ReturnType<typeof getUsers>>, unknown>,
	'data'
> & {
	users?: User[]
}

/**
 * Hook to get all users on the app
 * @returns
 */
export const useUsers = (): UseUsersReturn => {
	const { data: users, ...query } = useQuery('users', getUsers)

	return { users: users as User[], ...query }
}
