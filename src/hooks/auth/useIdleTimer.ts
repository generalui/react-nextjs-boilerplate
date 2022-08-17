import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const whiteList = ['/auth/signin', '/auth/signup']

const useIdleTimer = () => {
	const router = useRouter()
	const currentPathname = router.pathname

	let timeout: NodeJS.Timeout | null = null
	const restartAutoReset = () => {
		if (timeout) {
			clearTimeout(timeout)
		}
		timeout = setTimeout(() => {
			signOut()
			console.log('You have been idle for too long. Logging you out.')
		}, 1000 * 10)
	}

	const resetTimer = () => {
		console.log('resetting timer')

		restartAutoReset()
	}

	const trackActivity = (listener: () => void) => {
		window.addEventListener('mousemove', listener)
		window.addEventListener('click', listener)
		window.addEventListener('scroll', listener)
		window.addEventListener('keydown', listener)
	}

	useEffect(() => {
		if (whiteList.includes(currentPathname)) return

		restartAutoReset()
		trackActivity(resetTimer)

		// cleanup
		return () => {
			if (timeout) {
				clearTimeout(timeout)

				window.removeEventListener('mousemove', resetTimer)
			}
		}
	}, [currentPathname])
}

export default useIdleTimer
