import { ClientSafeProvider } from 'next-auth/react'
import { getProviders } from 'next-auth/react'

export interface SignInProps {
	providers: Record<string, ClientSafeProvider>
	csrfToken: string | undefined
}
