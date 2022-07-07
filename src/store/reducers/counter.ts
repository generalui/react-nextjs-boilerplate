import { createReduxModule } from 'hooks-for-redux'
import { getLocalState, persistState } from 'utils/client/persist'

type ExampleState = {
	count: number
	message: string | null
}

const STORE_NAME = 'ExampleStore'

const defaultState: ExampleState = {
	count: 0,
	message: null
}

const initialState = getLocalState(STORE_NAME) || defaultState

export const [
	useCounter,
	{ increment, decrement, add, setCount, setMessage, reset },
	counterStore
] = createReduxModule(STORE_NAME, initialState, {
	increment: (state) => ({ ...state, count: state.count + 1 }),
	decrement: (state) => ({ ...state, count: state.count - 1 }),
	add: (state, n) => ({ ...state, count: state.count + n }),
	setCount: (state, count) => ({ ...state, count }),
	setMessage: (state, message) => ({ ...state, message }),
	reset: () => defaultState
})

counterStore.subscribe((state) => {
	persistState(STORE_NAME, state)
})
