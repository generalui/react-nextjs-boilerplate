import { useText } from 'hooks/useText'
import { PageWrapper } from 'partials/PageWrapper'
import { SignInForm } from 'partials/SignInForm/SignInForm'
import { StagingWarning } from 'partials/StagingWarning'
import { Card } from 'common/Card'
import { SignInProps } from './SignIn.types'

export const SignIn = ({ csrfToken }: SignInProps) => {
	const { t } = useText('signIn')

	return (
		<PageWrapper title={t('title')} hideAuth hideSidebar>
			<StagingWarning className='mb-10' />

			<Card className='md:max-w-xl mx-auto p-6 mb-80 md:shadow-md'>
				<SignInForm className='max-w-xxl mx-auto' csrfToken={csrfToken} />
			</Card>
		</PageWrapper>
	)
}
