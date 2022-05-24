import { PageWrapper } from 'partials/PageWrapper'
import { SignInForm } from 'partials/SignInForm'
import { Card } from 'common/Card'
import { SignInProps } from './SignIn.types'

export const SignIn = ({ providers, csrfToken }: SignInProps) => {
	return (
		<PageWrapper title='Sign in' hideAuth>
			<Card className='md:max-w-xl mx-auto p-6 mb-80'>
				<SignInForm className='max-w-xxl mx-auto' providers={providers} csrfToken={csrfToken} />
			</Card>
		</PageWrapper>
	)
}
