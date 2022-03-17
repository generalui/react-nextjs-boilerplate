import { useEffect, useState } from 'react'
import { decrement, increment, reset, useCounter } from 'state/counter'
import { clearStoredState } from 'utils/persist'
import { StyledButton } from 'components/atoms'
import { Default as DefaultTemplate } from 'components/templates'
import styles from 'styles/Home.module.css'

export const Counter = () => {
	const { count } = useCounter()
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setTimeout(() => setLoading(false), 1000)
	}, [count])

	return (
		<DefaultTemplate title='Counter Example' loading={loading}>
			<div>
				<h1 className={styles.title}>Counter:</h1> <div data-testid="counter">{count}</div>
			</div>
			<div className={styles.buttonContainer}>
				<StyledButton data-testid="decrement" onClick={decrement}>-1</StyledButton>
				<StyledButton data-testid="reset" onClick={reset}>reset</StyledButton>
				<StyledButton data-testid="increment" onClick={increment}>+1</StyledButton>
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
