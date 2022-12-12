import { handleValidate } from 'utils/client/handleValidate'
import { useText } from 'hooks/useText'
import { Form } from 'partials/Form'
import { UnorderedList } from 'partials/UnorderedList'
import { Input } from 'common/Input'
import { SubmitButton } from 'common/SubmitButton'
import { Text } from 'common/Text'
import {
	NewPasswordInput,
	NewPasswordSchema,
	UpdatePasswordFormProps
} from './UpdatePasswordForm.types'

export const UpdatePasswordForm = ({
	className,
	testId = 'UpdatePasswordForm'
}: UpdatePasswordFormProps) => {
	const { t } = useText('settings.admin')
	const steps = Array.from({ length: 5 }, (_, i) => i + 1).map((step) => {
		return {
			text: t(`passwordRequirementsList.${step}`)
		}
	})

	const onSubmit = (values: NewPasswordInput) => {
		try {
			NewPasswordSchema.parse(values)
			console.log('🚀 ~ values', values)
		} catch (error) {
			console.log('🚀 ~ error')
		}
	}

	return (
		<div className={className} data-testid={testId}>
			<Form
				onSubmit={onSubmit}
				validate={(values) => handleValidate(values, NewPasswordSchema)}
				render={({ handleSubmit }) => (
					<form onSubmit={handleSubmit} className='flex flex-col gap-6'>
						<div className='grid gap-4'>
							<Text className='text-sm' size='base'>
								{t('updatePassword')}
							</Text>
							<Input name='newPassword' type='text' label={t('newPassword')} />
							<Input
								name='newPasswordConfirmation'
								type='text'
								label={t('newPasswordConfirmation')}
							/>
						</div>
						<div className=''>
							<SubmitButton
								className='w-full justify-center md:justify-start md:w-auto'
								disableOnLoading
							>
								{t('submitButton')}
							</SubmitButton>
						</div>

						<div>
							<Text className='text-sm' size='base'>
								{t('passwordRequirements')}
							</Text>
							<UnorderedList list={steps} className='pl-8' />
						</div>
					</form>
				)}
			/>
		</div>
	)
}
