import { favicon } from 'client.config'
import { backgroundColor, defaultMetaTitle } from 'client.config'
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
import { IdleTimer } from 'common/IdleTimer'
import { RoleManager } from 'common/RoleManager'
import 'styles/globals.scss'
import '../store'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	useEffect(() => {
		if (process.env.NEXT_PUBLIC_ENV === 'staging') {
			LogRocket.init('eog9r1/test-logrocket')
		}
	}, [])

	return (
		<>
			<Head>
				<link rel='shortcut icon' href={favicon} />

				{defaultMetaTitle && <title>{defaultMetaTitle}</title>}

				{/* TODO: Handle common meta data here */}
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
				{/*
				 	Style added here to set the background color based on the client config within tailwind's configuration settings.
					Due to this projects choice to use module.scss there isn't anywhere in the style sheets to import a js module. 
				  */}
				<style>{`html { background-color: ${backgroundColor} !important; }`}</style>
			</Head>

			<Provider>
				<SessionProvider session={session} refetchInterval={5}>
					<QueryClientProvider client={reactQueryClient}>
						<RoleManager>
							<Component {...pageProps} />
							<ToastContainer />
							<IdleTimer />
						</RoleManager>
					</QueryClientProvider>
				</SessionProvider>
			</Provider>
		</>
	)
}

export default MyApp
