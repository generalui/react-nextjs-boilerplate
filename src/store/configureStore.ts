/* eslint-disable */
import { createStore, getStore } from 'hooks-for-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// defaults to localStorage for web

const persistConfig = {
	key: 'root',
	storage
}

// const persistedReducer = persistReducer(persistConfig, {})

export default () => {
	const store = createStore({}, composeWithDevTools())
	const persistor = persistStore(store)
	return { store, persistor }
}
/* eslint-enable */
