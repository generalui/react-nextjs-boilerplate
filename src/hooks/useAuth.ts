import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useAuth = () => {
	const { status } = useSession()
	const router = useRouter()

	useEffect(() => {
		if (status === 'unauthenticated' && !router.pathname.startsWith('/auth'))
			router.push(
				{
					pathname: '/'
					// query: { ...router.query, callbackUrl: `${router.basePath}${router.asPath}` }
				},
				undefined,
				{}
			)
	}, [status, router])
}
