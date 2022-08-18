import { useEffect } from 'react'
import { useCurrentUser } from 'hooks/api/users/useCurrentUser'
import useIdleTimer from 'hooks/auth/useIdleTimer'
import { IdleTimerProps } from './IdleTimer.types'

export const IdleTimer = ({ children, className, testId = 'IdleTimer' }: IdleTimerProps) => {
	const user = useCurrentUser()
	useIdleTimer()

	useEffect(() => {
		return () => {
			if (user.status !== 'success') localStorage.removeItem('_expirationTime')
		}
	}, [user])

	return (
		<div className={className} data-testid={testId}>
			{children}
		</div>
	)
}
