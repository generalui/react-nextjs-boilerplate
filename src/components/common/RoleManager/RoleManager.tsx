import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { routePermissions } from 'utils/routePermissions'
import { useCurrentUser } from 'hooks/api/users/useCurrentUser'
import { RoleManagerProps } from './RoleManager.types'

export const RoleManager = ({ children }: RoleManagerProps) => {
	const { pathname, push } = useRouter()
	const { currentUser } = useCurrentUser()

	useEffect(() => {
		if (currentUser && pathname) {
			switch (currentUser.role) {
				case 'admin':
					if (!routePermissions.admin.includes(pathname)) {
						push('/')
					}
					break

				case 'participant':
					if (!routePermissions.participant.includes(pathname)) {
						push('/participant')
					}
					break

				default:
					if (!routePermissions.general.includes(pathname)) {
						push('/auth/signin')
					}
			}
		}
	}, [children, currentUser, pathname, push])

	return <>{children}</>
}
