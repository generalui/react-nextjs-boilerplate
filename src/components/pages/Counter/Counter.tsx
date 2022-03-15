import { decrement, increment, reset, useCounter } from 'state/counter'
import { clearStoredState } from 'utils/persist'
import { StyledButton } from 'components/StyledButton'
import { FlexContainer } from 'components/atoms/FlexContainer/FlexContainer'
import DefaultTemplate from 'components/templates/Default/Default'
import styles from 'styles/Home.module.css'

const Counter = () => {
	const { count } = useCounter()

	return (
		<DefaultTemplate title='Counter Example'>
			<FlexContainer>
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
			</FlexContainer>
		</DefaultTemplate>
	)
}

export default Counter
