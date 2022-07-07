import { ClientSafeProvider } from 'next-auth/react'
import { CommonProps } from 'types/CommonProps'

export interface SignInFormProps extends CommonProps {
	providers?: Record<string, ClientSafeProvider>
	csrfToken: string | undefined
}
