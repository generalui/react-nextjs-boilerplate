/* eslint-disable */
import { Provider } from 'hooks-for-redux'
import type { AppProps } from 'next/app'
import 'styles/globals.css'
import '../store'

/* eslint-enable */

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider>
			<Component {...pageProps} />
		</Provider>
	)
}

export default MyApp
