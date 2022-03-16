/* eslint-disable */
import { Provider } from 'hooks-for-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from 'pages/about'
import Counter from 'pages/counter'
import Home from 'pages/index'
import { GlobalStyle } from 'styles/globalStyles'
import 'styles/globals.css'
import '../store'

/* eslint-enable */

function MyApp() {
	return (
		<BrowserRouter>
			<Provider>
				<GlobalStyle />
				<Routes>
					<Route index element={<Home />} />
					<Route path='/about' element={<About />} />
					<Route path='/counter' element={<Counter />} />
				</Routes>
			</Provider>
		</BrowserRouter>
	)
}

export default MyApp
