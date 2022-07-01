import { User } from '@prisma/client'
import LogRocket from 'logrocket'
import { useEffect } from 'react'
import { UseQueryResult, useQuery } from 'react-query'
import { getCurrentUser } from 'utils/api/getCurrentUser'

export const useCurrentUser = (): Omit<UseQueryResult<Awaited<User>, unknown>, 'data'> & {
	currentUser?: User
} => {
	const { data: currentUser, ...query } = useQuery('current-user', getCurrentUser)

	useEffect(() => {
		if (process.env.NEXT_PUBLIC_URL === 'staging' && currentUser)
			LogRocket.identify(currentUser.id, {
				name: currentUser.name || '',
				email: currentUser.email || ''

				// Add your own custom user variables here, ie:
			})
	}, [currentUser])
	return { currentUser, ...query }
}
