import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { dispatchErrorToast } from 'utils/client/toast'
import { roleRoutes, routes } from 'utils/routes'
import { useCurrentUser } from 'hooks/api/users/useCurrentUser'
import { RoleManagerProps } from './RoleManager.types'

export const RoleManager = ({ children }: RoleManagerProps) => {
	const [page, setPage] = useState<ReactNode | null>()
	const router = useRouter()
	const currentUser = useCurrentUser()

	useEffect(() => {
		switch (currentUser?.currentUser?.role) {
			case 'admin':
				setPage(children)
				break

			case 'participant':
				if (roleRoutes.participant.includes(router.pathname)) {
					setPage(children)
					break
				} else {
					dispatchErrorToast('You are not authorized to access this page')
					router.push('/participant')
					setPage(null)
					break
				}

			default:
				if (roleRoutes.general.includes(router.pathname)) {
					setPage(children)
				} else {
					router.push(routes.general.signIn)
				}
		}
	}, [children, currentUser?.currentUser?.role, router, router.pathname])

	return <>{page}</>
}
