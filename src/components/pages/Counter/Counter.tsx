import { decrement, increment, reset, useCounter } from 'reducers/counter'
import { clearStoredState } from 'utils/persist'
import { PageWrapper } from 'partials/PageWrapper'
import { Button, SecondaryDangerButton } from 'common/Button'
import { FlexContainer } from 'common/FlexContainer'
import { Text } from 'common/Text'

export const Counter = () => {
	const { count } = useCounter()

	return (
		<PageWrapper title='Counter Example'>
			<FlexContainer column size='lg'>
				<Text as='h1' data-testid='counter'>
					Counter: {count}
				</Text>
				<FlexContainer
					nested
					justify='space-between'
					size='sm'
					margin='0 auto var(--spaces-6) auto'
				>
					<Button data-testid='decrement' onClick={decrement}>
						-1
					</Button>
					<Button data-testid='reset' onClick={reset}>
						reset
					</Button>
					<Button data-testid='increment' onClick={increment}>
						+1
					</Button>
				</FlexContainer>
				<FlexContainer nested size='sm'>
					<SecondaryDangerButton
						onClick={() => {
							reset()
							clearStoredState()
						}}
					>
						clear local storage
					</SecondaryDangerButton>
				</FlexContainer>
			</FlexContainer>
		</PageWrapper>
	)
}
