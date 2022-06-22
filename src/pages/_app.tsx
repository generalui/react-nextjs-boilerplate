import { Provider } from 'hooks-for-redux'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import { reactQueryClient } from 'utils/react-query'
import 'styles/globals.scss'
import '../store'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<Provider>
			<SessionProvider session={session}>
				<QueryClientProvider client={reactQueryClient}>
					<Component {...pageProps} />
				</QueryClientProvider>
			</SessionProvider>
		</Provider>
	)
}

export default MyApp
