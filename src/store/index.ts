import { createStore, setStore } from 'hooks-for-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

export default setStore(createStore({}, composeWithDevTools()))
