import { useEffect, useState } from 'react'
import { decrement, increment, reset, useCounter } from 'state/counter'
import { clearStoredState } from 'utils/persist'
import { StyledButton } from 'components/StyledButton'
import DefaultTemplate from 'components/templates/Default/Default'
import styles from 'styles/Home.module.css'

const Counter = () => {
	const { count } = useCounter()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => setLoading(false), 2000)
	}, [])

	return (
		<DefaultTemplate title='Counter Example' loading={loading}>
			<h1 className={styles.title}>Counter: {count}</h1>
			<div className={styles.buttonContainer}>
				<StyledButton onClick={decrement}>-1</StyledButton>
				<StyledButton onClick={reset}>reset</StyledButton>
				<StyledButton onClick={increment}>+1</StyledButton>
			</div>
			<div className={styles.buttonContainer}>
				<button
					onClick={() => {
						reset()
						clearStoredState()
					}}
				>
					clear local storage
				</button>
			</div>
		</DefaultTemplate>
	)
}

export default Counter
