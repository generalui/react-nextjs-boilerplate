import { signIn, signOut, useSession } from 'next-auth/react'
import { FC } from 'react'
import { SignInOutProps } from './SignInOut.types'

export const RenderAuth = () => {
	const { data: session } = useSession()

	if (session) {
		return (
			<>
				<h4>Signed in as {session.user?.name}</h4>
				<button onClick={() => signOut()}>Sign out</button>
			</>
		)
	}
	return (
		<>
			<h4>Not signed in </h4>
			<button onClick={() => signIn()}>Sign in</button>
		</>
	)
}

export const SignInOut: FC<SignInOutProps> = () => {
	return (
		<div data-testid='SignInOut'>
			<RenderAuth />
		</div>
	)
}
