import LogRocket from 'logrocket'
import { useEffect } from 'react'
import { UseQueryResult, useQuery } from 'react-query'
import { User } from 'types/User'
import { getCurrentUser } from 'utils/requests/getCurrentUser'

export type UseCurrentUser = () => Omit<UseQueryResult<Awaited<User>, unknown>, 'data'> & {
	currentUser?: User
}

export const useCurrentUser: UseCurrentUser = () => {
	const { data: currentUser, ...query } = useQuery('current-user', getCurrentUser)

	useEffect(() => {
		if (process.env.NEXT_PUBLIC_ENV === 'staging' && currentUser)
			LogRocket.identify(currentUser.id, {
				name: currentUser.name || '',
				email: currentUser.email || ''

				// Add your own custom user variables here, ie:
			})
	}, [currentUser])
	return { currentUser, ...query }
}
