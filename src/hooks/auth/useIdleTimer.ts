import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { maxAge } from 'utils/constants'
import { throttle } from 'utils/throttle'

const whiteList = ['/auth/signin', '/auth/signup']
const maxAgeFromNow = Date.now() + 1000 * maxAge
const localStorageExpTimeName = '_expirationTime'
const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart']

const useIdleTimer = () => {
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
				localStorage.getItem(localStorageExpTimeName) || maxAgeFromNow.toString()
			)

			if (expirationTime < Date.now()) {
				signOut()
				localStorage.removeItem(localStorageExpTimeName)
			}
		}, 1000 * 60)

	const resetExpirationTime = () => {
		throttle(
			() => localStorage.setItem(localStorageExpTimeName, maxAgeFromNow.toString()),
			300,
			'resetExpirationTime'
		)
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

		trackActivity(resetExpirationTime)

		// cleanup
		return () => {
			clearInterval(interval)
			localStorage.removeItem(localStorageExpTimeName)
			untrackActivity(resetExpirationTime)
		}
	}, [currentPathname])
}

export default useIdleTimer
