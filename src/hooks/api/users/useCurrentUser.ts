import { User } from '@prisma/client'
import { UseQueryResult, useQuery } from 'react-query'
import { getCurrentUser } from 'utils/api/getCurrentUser'

export const useCurrentUser = (): Omit<UseQueryResult<Awaited<User>, unknown>, 'data'> & {
	currentUser?: User
} => {
	const { data: currentUser, ...query } = useQuery('current-user', getCurrentUser)
	return { currentUser, ...query }
}
