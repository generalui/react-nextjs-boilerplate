import cookies from 'utils/client/cookies'

const ACCESS_TOKEN_KEY = 'access_token'
const APP_STATE = 'react_starter_storage'

export const clearStoredState = () => {
	cookies.remove(APP_STATE)
}

export const persistState = (scope: string, state: Record<string, unknown>) => {
	const currentState = cookies.get(APP_STATE) ?? {}
	const updatedState = {
		...currentState,
		[scope]: state
	}

	cookies.set(APP_STATE, updatedState, { path: '/' })
}

export const storeAccessToken = (token: string) => {
	// Max age set to 3 days
	cookies.set(ACCESS_TOKEN_KEY, token, { path: '/', maxAge: 259200 })
}

export const getAccessToken = () => {
	cookies.get(ACCESS_TOKEN_KEY)
}

export const getLocalState = (scope?: string) => {
	const localState = cookies.get(APP_STATE)

	return scope ? localState?.[scope] : localState
}
