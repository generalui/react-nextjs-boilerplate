/*!
 * Profile Page
 */
import { Form } from 'react-final-form'
import { UserInput, UserSchema } from 'types/index'
import { useCurrentUser } from 'hooks/api/users/useCurrentUser'
import { useUpdateCurrentUser } from 'hooks/api/users/useUpdateCurrentUser'
import { PageWrapper } from 'partials/PageWrapper'
import { Button } from 'common/Button'
import { Card } from 'common/Card'
import { Input } from 'common/Input'
import { ProfileProps } from './Profile.types'

export const Profile = function Profile({ testId = 'Profile' }: ProfileProps) {
	const { currentUser } = useCurrentUser()
	const { updateCurrentUser, isError, isLoading } = useUpdateCurrentUser()

	const onSubmit = async (values: UserInput) => {
		if (isLoading) return
		await updateCurrentUser(UserSchema.parse(values))
	}

	return (
		<PageWrapper title='Profile' data-testid={testId}>
			{currentUser && (
				<Card className='p-6'>
					<div className='grid grid-cols-6'>
						<div className=''>
							<img
								className='mb-3 w-36 h-36 rounded-full shadow-lg'
								src='/images/study1.png'
								alt='user'
							/>
						</div>
						<div className='col-span-3 my-auto ml-2'>
							<div>
								<h1>{currentUser.name}</h1>
							</div>
							<div>{currentUser.email}</div>
						</div>
					</div>
					<div>
						<Form
							onSubmit={onSubmit}
							initialValues={{ name: currentUser.name, email: currentUser.email }}
							render={({ handleSubmit }) => (
								<form onSubmit={handleSubmit}>
									<div className='mt-4'>
										<label htmlFor='name' className='text-sm'>
											Full name
										</label>
										<Input name='name' type='text' />
									</div>
									<div>
										<label htmlFor='email' className='text-sm'>
											Email
										</label>
										<Input name='email' type='email' disabled />
									</div>
									<div className='mt-12'>
										<Button type='submit'>Update</Button>
									</div>
								</form>
							)}
						/>
					</div>
				</Card>
			)}
		</PageWrapper>
	)
}
