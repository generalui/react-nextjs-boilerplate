/*!
 * Settings Page
 */
import { useText } from 'hooks/useText'
import { Form } from 'partials/Form'
import { PageWrapper } from 'partials/PageWrapper'
import { Card } from 'common/Card'
import { Input } from 'common/Input'
import { SubmitButton } from 'common/SubmitButton'
import { SettingsProps } from './Settings.types'

export const Settings = function Settings({ testId = 'Settings' }: SettingsProps) {
	const { t } = useText('settings.admin')

	return (
		<PageWrapper title='Settings' testId={testId}>
			<Card>
				<Form
					onSubmit={() => console.log('submit')}
					// validate={(values) => handleValidate(values, UserSchema)}
					render={({ handleSubmit }) => (
						<form onSubmit={handleSubmit} className='flex flex-col gap-6'>
							<div className='grid gap-4'>
								<label htmlFor='name' className='text-sm'>
									{t('updatePassword')}
								</label>
								<Input name='password' type='text' />
								<Input name='passwordConfirmation' type='text' />
							</div>
							<div className=''>
								<SubmitButton
									className='w-full justify-center md:justify-start md:w-auto'
									disableOnLoading
								>
									{t('submitButton')}
								</SubmitButton>
							</div>
						</form>
					)}
				/>
			</Card>
		</PageWrapper>
	)
}
