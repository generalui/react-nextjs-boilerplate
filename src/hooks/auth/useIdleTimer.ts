import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { maxAge } from 'utils/constants'

const whiteList = ['/auth/signin', '/auth/signup']
// const thirtyMinutesFromNow = Date.now() + 1000 * maxAge
const twoMinutesFromNow = Date.now() + 1000 * maxAge
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
				localStorage.getItem(localStorageExpTimeName) || twoMinutesFromNow.toString()
			)

			if (expirationTime < Date.now()) {
				signOut()
				localStorage.removeItem(localStorageExpTimeName)
			}
		}, 1000 * 60)

	const resetExpirationTime = () => {
		setTimeout(() => {
			localStorage.setItem(localStorageExpTimeName, twoMinutesFromNow.toString())
		}, 300)
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
