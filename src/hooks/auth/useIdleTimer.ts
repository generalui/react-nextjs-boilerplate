import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { maxAge } from 'utils/constants'
import { throttle } from 'utils/throttle'
import { useCurrentUser } from 'hooks/api/users/useCurrentUser'

const whiteList = ['/auth/signin', '/auth/signup']
const localStorageExpTimeName = '_expirationTime'
const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart']

const useIdleTimer = () => {
	const user = useCurrentUser()
	const router = useRouter()
	const currentPathname = router.pathname

	/**
	 * @description - Creates an interval that will check if the user is idle by comparing the current time and the expiration time.
	 *
	 * It uses local  storage to store the expiration time, so the user will not be signed out when using multiple tabs.
	 */
	const createIdleInterval = () =>
		setInterval(() => {
			const expirationTime = parseInt(
				localStorage.getItem(localStorageExpTimeName) || (Date.now() + 1000 * maxAge).toString()
			)

			if (expirationTime < Date.now()) {
				signOut()
				localStorage.removeItem(localStorageExpTimeName)
			}
		}, 500)

	const setExpTimeInLocalStorage = () => {
		localStorage.setItem(localStorageExpTimeName, (Date.now() + 1000 * maxAge).toString())
	}

	const trackActivity = (listener: () => void) => {
		activityEvents.map((event) => window.addEventListener(event, listener))
	}

	const untrackActivity = (listener: () => void) => {
		activityEvents.map((event) => window.removeEventListener(event, listener))
	}

	useEffect(() => {
		if (whiteList.includes(currentPathname)) return

		const interval = createIdleInterval()
		const resetExpirationTime = () => {
			throttle(setExpTimeInLocalStorage, 300, 'resetExpirationTime')
		}

		trackActivity(resetExpirationTime)

		// cleanup
		return () => {
			clearInterval(interval)
			localStorage.removeItem(localStorageExpTimeName)
			untrackActivity(resetExpirationTime)
		}
	}, [currentPathname])

	useEffect(() => {
		if (user.currentUser?.id) setExpTimeInLocalStorage()

		return () => {
			if (!user.currentUser?.id) localStorage.removeItem(localStorageExpTimeName)
		}
	}, [user])
}

export default useIdleTimer
