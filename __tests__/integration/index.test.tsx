import { queryByAttribute, render } from '@testing-library/react'
import { Provider } from 'hooks-for-redux'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { Counter } from 'pages/Counter'

describe('Counter page test', () => {
	const getByDataTestId = queryByAttribute.bind(null, 'data-testid')

	it('renders Counter and resets it', async () => {
		const counterPage = render(
			<Provider>
				<Counter />
			</Provider>
		)
		const counter = getByDataTestId(counterPage.container, 'counter')
		const increment = getByDataTestId(counterPage.container, 'increment')
		const decrement = getByDataTestId(counterPage.container, 'decrement')
		const reset = getByDataTestId(counterPage.container, 'reset')

		expect(counter?.innerHTML).toBe('Counter: 0')
		act(() => {
			increment?.click()
		})
		expect(counter?.innerHTML).toBe('Counter: 1')
		act(() => {
			decrement?.click()
		})
		expect(counter?.innerHTML).toBe('Counter: 0')
		act(() => {
			decrement?.click()
		})
		expect(counter?.innerHTML).toBe('Counter: -1')
		act(() => {
			reset?.click()
		})
		expect(counter?.innerHTML).toBe('Counter: 0')
	})
})
