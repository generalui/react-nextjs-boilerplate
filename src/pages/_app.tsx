/* eslint-disable */
import { Provider } from 'hooks-for-redux'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import 'styles/globals.css'
import '../store'

/* eslint-enable */

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	console.log('~ pageProps', pageProps)
	return (
		<Provider>
			<SessionProvider session={session}>
				<Component {...pageProps} />
			</SessionProvider>
		</Provider>
	)
}

export default MyApp
