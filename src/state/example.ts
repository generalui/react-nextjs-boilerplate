import { createReduxModule } from 'hooks-for-redux'

type ExampleState = {
	count: number
	message: string | null
}

const defaultState: ExampleState = {
	count: 0,
	message: null
}

export const [useExample, { increment, decrement, add, setCount, setMessage }, exampleStore] =
	createReduxModule('ExampleStore', defaultState, {
		increment: (state) => ({ ...state, count: state.count + 1 }),
		decrement: (state) => ({ ...state, count: state.count - 1 }),
		add: (state, n) => ({ ...state, count: state.count + n }),
		setCount: (state, count) => ({ ...state, count }),
		setMessage: (state, message) => ({ ...state, message })
	})

exampleStore.subscribe((state) => {
	console.log('ExampleStore has changed!', state)
})
