import { decrement, increment, reset, useCounter } from 'state/counter'
import { clearStoredState } from 'utils/persist'
import { ButtonBody } from 'components/atoms/ButtonBody/ButtonBody'
import { ButtonsContainer } from 'components/atoms/ButtonsContainer/ButtonsContainer'
import { FlexContainer } from 'components/atoms/FlexContainer/FlexContainer'
import { H1 } from 'components/atoms/Headers/H1'
import { Default as DefaultTemplate } from 'components/templates'

export const Counter = () => {
	const { count } = useCounter()

	return (
		<DefaultTemplate title='Counter Example'>
			<FlexContainer>
				<H1 data-testid="counter">Counter: {count}</H1>
				<ButtonsContainer>
					<ButtonBody data-testid="decrement" onClick={decrement}>-1</ButtonBody>
					<ButtonBody data-testid="reset" onClick={reset}>reset</ButtonBody>
					<ButtonBody data-testid="increment" onClick={increment}>+1</ButtonBody>
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
		</DefaultTemplate>
	)
}
