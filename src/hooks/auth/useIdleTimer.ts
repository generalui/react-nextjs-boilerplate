import { useEffect } from 'react'

const useIdleTimer = () => {
	let timeout: NodeJS.Timeout | null = null
	const restartAutoReset = () => {
		if (timeout) {
			clearTimeout(timeout)
		}
		timeout = setTimeout(() => {
			console.log('You have been idle for too long. Logging you out.')
		}, 1000 * 10) // 60 Seconds
	}

	const resetTimer = () => {
		console.log('resetting timer')

		restartAutoReset()
	}

	useEffect(() => {
		restartAutoReset()
		window.addEventListener('mousemove', resetTimer)

		// cleanup
		return () => {
			if (timeout) {
				clearTimeout(timeout)
				window.removeEventListener('mousemove', resetTimer)
			}
		}
	}, [])
}

export default useIdleTimer
