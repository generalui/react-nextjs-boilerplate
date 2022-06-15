/* eslint-disable */
import { Provider } from 'hooks-for-redux'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'styles/globals.css'
import '../store'

// The following module is not declared but needed by the flowbite ui component library to work
// @ts-ignore
dynamic(() => import('flowbite'), { ssr: false })
/* eslint-enable */

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	console.log('~ pageProps', pageProps)
	const queryClient = new QueryClient()

	return (
		<Provider>
			<SessionProvider session={session}>
				<QueryClientProvider client={queryClient}>
					<Component {...pageProps} />
				</QueryClientProvider>
			</SessionProvider>
		</Provider>
	)
}

export default MyApp
