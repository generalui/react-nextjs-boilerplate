import { useEffect, useState } from 'react'
import { decrement, increment, reset, useCounter } from 'state/counter'
import { clearStoredState } from 'utils/persist'
import { ButtonBody } from 'components/atoms/ButtonBody/ButtonBody'
import { ButtonsContainer } from 'components/atoms/ButtonsContainer/ButtonsContainer'
import { FlexContainer } from 'components/atoms/FlexContainer/FlexContainer'
import { H1 } from 'components/atoms/Headers/H1'
import { Default as DefaultTemplate } from 'components/templates'

export const Counter = () => {
	const { count } = useCounter()
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setTimeout(() => setLoading(false), 1000)
	}, [count])

	return (
<<<<<<< HEAD
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
=======
		<DefaultTemplate title='Counter Example'>
			<FlexContainer>
				<H1>Counter: {count}</H1>
				<ButtonsContainer>
					<ButtonBody onClick={decrement}>-1</ButtonBody>
					<ButtonBody onClick={reset}>reset</ButtonBody>
					<ButtonBody onClick={increment}>+1</ButtonBody>
				</ButtonsContainer>
				<ButtonsContainer>
					<button
						onClick={() => {
							reset()
							clearStoredState()
						}}
					>
						clear local storage
					</button>
				</ButtonsContainer>
			</FlexContainer>
>>>>>>> main
		</DefaultTemplate>
	)
}
