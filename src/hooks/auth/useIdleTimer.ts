import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const whiteList = ['/auth/signin', '/auth/signup']
// const thirtyMinutesFromNow = Date.now() + 1000 * 60 * 30
const twoMinutesFromNow = Date.now() + 1000 * 60 * 2

const useIdleTimer = () => {
	const router = useRouter()
	const currentPathname = router.pathname

	let interval: NodeJS.Timer | null = null

	/**
	 * @description - Creates an interval that will check if the user is idle by comparing the current time and the expiration time.
	 *
	 * It uses local  storage to store the expiration time, so the user will not be signed out when using multiple tabs.
	 */
	const startIdleInterval = () => {
		interval = setInterval(() => {
			const expirationTime = parseInt(
				localStorage.getItem('_expirationTime') || twoMinutesFromNow.toString()
			)

			if (expirationTime < Date.now()) {
				signOut()
				localStorage.removeItem('_expirationTime')
			}
		}, 1000 * 60)
	}

	const resetExpirationTime = () => {
		setTimeout(() => {
			localStorage.setItem('_expirationTime', twoMinutesFromNow.toString())
		}, 300)
	}

	const trackActivity = (listener: () => void) => {
		window.addEventListener('mousemove', listener)
		window.addEventListener('click', listener)
		window.addEventListener('scroll', listener)
		window.addEventListener('keydown', listener)
	}

	const untrackActivity = (listener: () => void) => {
		window.removeEventListener('mousemove', listener)
		window.removeEventListener('click', listener)
		window.removeEventListener('scroll', listener)
		window.removeEventListener('keydown', listener)
	}

	useEffect(() => {
		if (whiteList.includes(currentPathname)) return

		startIdleInterval()
		trackActivity(resetExpirationTime)

		// cleanup
		return () => {
			if (interval) {
				clearInterval(interval)
				localStorage.removeItem('_expirationTime')
				untrackActivity(resetExpirationTime)
			}
		}
	}, [currentPathname])
}

export default useIdleTimer
