import bcrypt from 'bcryptjs'
import { useRouter } from 'next/router'
import { handleValidate } from 'utils/client/handleValidate'
import { toast } from 'utils/client/toast'
import { useCurrentUser } from 'hooks/api/users/useCurrentUser'
import { useUpdateCurrentUser } from 'hooks/api/users/useUpdateCurrentUser'
import { useUpdateUser } from 'hooks/api/users/useUpdateUsers'
import { useText } from 'hooks/useText'
import { Form } from 'partials/Form'
import { UnorderedList } from 'partials/UnorderedList'
import { UserSelect } from 'partials/UserSelect'
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
	const { currentUser } = useCurrentUser()
	const { updateCurrentUser } = useUpdateCurrentUser(onSuccess)
	const { mutate: updateUser } = useUpdateUser(onSuccess)
	const { t } = useText('settings.admin')
	const { push } = useRouter()

	const steps = Array.from({ length: 5 }, (_, i) => i + 1).map((step) => {
		return {
			text: t(`passwordRequirementsList.${step}`)
		}
	})

	function onSuccess() {
		push('/')
		toast(t('success'))
	}

	const onSubmit = (values: NewPasswordInput) => {
		try {
			NewPasswordSchema.parse(values)
			const userConfirmation = confirm(t('userConfirmation'))
			if (!userConfirmation) return
			if (!values.user && currentUser?.name) {
				updateCurrentUser({
					name: currentUser.name,
					password: bcrypt.hashSync(values.newPassword, 8)
				})
			} else if (values.user) {
				updateUser({
					user: values.user.meta.user,
					password: bcrypt.hashSync(values.newPassword, 8)
				})
			}
		} catch (error) {
			return error
		}
	}

	return (
		<div className={className} data-testid={testId}>
			<Form
				onSubmit={onSubmit}
				validate={(values) => handleValidate(values, NewPasswordSchema)}
				render={({ handleSubmit }) => (
					<form onSubmit={handleSubmit} className='flex flex-col gap-6'>
						<div className='grid gap-2'>
							{currentUser?.role === 'admin' && (
								<UserSelect
									name='user'
									label={t('selectUser')}
									userType='all'
									placeholder={t('placeholders.selectUser')}
								/>
							)}
							<Input
								name='newPassword'
								type='password'
								label={t('newPassword')}
								placeholder={t('placeholders.newPassword')}
							/>
							<Input
								name='newPasswordConfirmation'
								type='password'
								label={t('newPasswordConfirmation')}
								placeholder={t('placeholders.newPasswordConfirmation')}
							/>
						</div>
						<div>
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
