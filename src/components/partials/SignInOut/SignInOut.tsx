import { signIn, signOut, useSession } from 'next-auth/react'
import { FC } from 'react'
import { useText } from 'hooks/useText'
import { Button } from 'common/Button'
import { SignInOutProps } from './SignInOut.types'

export const RenderAuth = () => {
	const { data: session } = useSession()
	const { t } = useText('common.signInOut')

	if (session) {
		return (
			<>
				<span className='mr-2'>{t('signedInAs', session.user?.name || '')}</span>{' '}
				<Button onClick={() => signOut()}>{t('signOut')}</Button>
			</>
		)
	}

	return (
		<>
			<Button onClick={() => signIn()}>{t('signIn')}</Button>
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
