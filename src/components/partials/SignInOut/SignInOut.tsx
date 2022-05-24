import { signIn, signOut, useSession } from 'next-auth/react'
import { FC } from 'react'
import { Button } from 'common/Button'
import { SignInOutProps } from './SignInOut.types'

export const RenderAuth = () => {
	const { data: session } = useSession()

	if (session) {
		return (
			<>
				<span className='mr-2'>Signed in as {session.user?.name}</span>{' '}
				<Button onClick={() => signOut()}>Sign out</Button>
			</>
		)
	}
	return (
		<>
			<Button onClick={() => signIn()}>Sign in</Button>
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
