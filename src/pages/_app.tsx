import { favicon } from 'client.config'
import { Provider } from 'hooks-for-redux'
import LogRocket from 'logrocket'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { reactQueryClient } from 'utils/client/react-query'
import 'styles/globals.scss'
import useIdleTimer from '../hooks/auth/useIdleTimer'
import '../store'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	useIdleTimer()

	useEffect(() => {
		if (process.env.NEXT_PUBLIC_ENV === 'staging') {
			LogRocket.init('eog9r1/test-logrocket')
		}
	}, [])

	return (
		<>
			<Head>
				<link rel='shortcut icon' href={favicon} />
			</Head>
			<Provider>
				<SessionProvider session={session}>
					<QueryClientProvider client={reactQueryClient}>
						<Component {...pageProps} />
						<ToastContainer />
					</QueryClientProvider>
				</SessionProvider>
			</Provider>
		</>
	)
}

export default MyApp
