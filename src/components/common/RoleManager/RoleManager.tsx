import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { routePermissions } from 'utils/routePermissions'
import { Loader } from 'common/Loader'
import { RoleManagerProps } from './RoleManager.types'

export const RoleManager = ({ children }: RoleManagerProps) => {
	const session = useSession()
	const { pathname, push } = useRouter()
	const [authorized, setAuthorized] = useState(false)

	const isUserAuthenticated = useMemo(() => session.status === 'authenticated', [session.status])

	const authCheck = useCallback(
		(urlString: string) => {
			// Get the pathname from the urlString
			const path = `/${urlString.split('?')[0].split('/').slice(1).join('/')}`

			if (session.status === 'loading') {
				setAuthorized(false)
			} else if (!isUserAuthenticated) {
				if (routePermissions.general.includes(path)) {
					setAuthorized(true)
				} else {
					setAuthorized(false)
					push({
						pathname: '/auth/signin'
					})
				}
			} else {
				switch (session.data?.role) {
					case 'admin':
						if (routePermissions.admin.includes(path)) {
							setAuthorized(true)
						} else {
							push('/')
						}
						break
					case 'participant':
						if (routePermissions.participant.includes(path)) {
							setAuthorized(true)
						} else {
							push('/participant')
						}
						break
					default:
						if (!routePermissions.general.includes(path)) {
							push('/auth/signin')
						}
				}
			}
		},
		[isUserAuthenticated, push, session.data?.role, session.status]
	)

	useEffect(() => {
		authCheck(pathname)
	}, [authCheck, pathname])

	return (
		<>
			{authorized ? (
				children
			) : (
				<div className='h-screen flex justify-center items-center margin-auto'>
					<Loader isLoading />
				</div>
			)}
		</>
	)
}
