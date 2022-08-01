/*!
 * Profile Page
 */
import { Form } from 'react-final-form'
import { UserInput, UserSchema } from 'types/index'
import { handleValidate } from 'utils/client/handleValidate'
import { useCurrentUser } from 'hooks/api/users/useCurrentUser'
import { useUpdateCurrentUser } from 'hooks/api/users/useUpdateCurrentUser'
import { useText } from 'hooks/useText'
import { PageWrapper } from 'partials/PageWrapper'
import { Card } from 'common/Card'
import { ImageInput } from 'common/ImageInput'
import { Input } from 'common/Input'
import { SubmitButton } from 'common/SubmitButton'
import { ProfileProps } from './Profile.types'

export const Profile = function Profile({ testId = 'Profile' }: ProfileProps) {
	const { currentUser } = useCurrentUser()
	const { updateCurrentUser, isLoading } = useUpdateCurrentUser()
	const { t } = useText('profile.updateUserForm')

	const onSubmit = async (values: UserInput) => {
		if (isLoading) return

		await updateCurrentUser({ ...UserSchema.parse(values), image: values.image })
	}

	return (
		<PageWrapper title='Profile' testId={testId}>
			{currentUser && (
				<Card className='p-6'>
					<Form
						onSubmit={onSubmit}
						initialValues={{
							name: currentUser.name,
							email: currentUser.email,
							image: currentUser.image?.image?.url
						}}
						validate={(values) => handleValidate(values, UserSchema)}
						render={({ handleSubmit }) => (
							<form onSubmit={handleSubmit} className='flex flex-col gap-10	 lg:gap-12'>
								<div className='flex flex-col lg:flex-row gap-10 lg:gap-6 lg:items-center'>
									{/* Header */}
									<div className='flex justify-center lg:justify-start '>
										<ImageInput
											name='image'
											className='w-36 h-36 rounded-full lg:w-40 lg:h-40'
											dropzoneClassName='w-36 h-36 rounded-full lg:w-40 lg:h-40'
											editIconClassName='right-8'
											errorClassName='mb-[-1rem]'
											initialValue={currentUser.image?.image?.url}
											placeholder='/images/profile-image-placeholder.jpg'
										/>
									</div>
									<div>
										<div>
											<h1>{currentUser.name}</h1>
										</div>
										<div>{currentUser.email}</div>
									</div>
								</div>
								{/* Details */}
								<div>
									<div className=''>
										<label htmlFor='name' className='text-sm'>
											{t('name')}
										</label>
										<Input name='name' type='text' />
									</div>
									<div>
										<label htmlFor='email' className='text-sm'>
											{t('email')}
										</label>
										<Input name='email' type='email' disabled />
									</div>
								</div>
								<div className=''>
									<SubmitButton
										className='w-full justify-center md:justify-start md:w-auto'
										isLoading={isLoading}
										disableOnLoading
									>
										{t('submitButton')}
									</SubmitButton>
								</div>
							</form>
						)}
					/>
				</Card>
			)}
		</PageWrapper>
	)
}
