import { Provider } from 'hooks-for-redux'
import LogRocket from 'logrocket'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { QueryClientProvider } from 'react-query'
import { reactQueryClient } from 'utils/react-query'
import 'styles/globals.scss'
import '../store'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	useEffect(() => {
		if (process.env.NEXT_PUBLIC_ENV === 'staging') {
			LogRocket.init('eog9r1/test-logrocket')
		}
	}, [])

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
