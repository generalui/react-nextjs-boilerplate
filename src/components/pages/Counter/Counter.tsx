import { useEffect, useState } from 'react'
import { decrement, increment, reset, useCounter } from 'state/counter'
import { clearStoredState } from 'utils/persist'
import { ButtonBody } from 'components/atoms/ButtonBody/ButtonBody'
import { ButtonsContainer } from 'components/atoms/ButtonsContainer/ButtonsContainer'
import { FlexContainer } from 'components/atoms/FlexContainer/FlexContainer'
import { H1 } from 'components/atoms/Headers/H1'
import DefaultTemplate from 'components/templates/Default/Default'

const Counter = () => {
	const { count } = useCounter()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => setLoading(false), 2000)
	}, [])

	return (
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
		</DefaultTemplate>
	)
}

export default Counter
