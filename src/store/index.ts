import { setStore } from 'hooks-for-redux'
import configureStore from './configureStore'

const { store } = configureStore()

export default setStore(store)
