/*!
 * Profile Page
 */
import { Form } from 'react-final-form'
import { UserInput, UserSchema } from 'types/index'
import { useCurrentUser } from 'hooks/api/users/useCurrentUser'
import { useUpdateCurrentUser } from 'hooks/api/users/useUpdateCurrentUser'
import { PageWrapper } from 'partials/PageWrapper'
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
										<Input name='email' type='email' />
									</div>
									<div className='mt-12'>
										<button
											type='submit'
											className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800'
										>
											<span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
												Update
											</span>
										</button>
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
