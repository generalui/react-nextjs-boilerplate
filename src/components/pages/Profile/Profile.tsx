/*!
 * Profile Page
 */
import { Form } from 'react-final-form'
import { PageWrapper } from 'partials/PageWrapper'
import { Card } from 'common/Card'
import { Input } from 'common/Input'
import { ProfileProps } from './Profile.types'

export const Profile = function Profile({ testId = 'Profile' }: ProfileProps) {
	return (
		<PageWrapper title='Profile' data-testid={testId}>
			<Card className='p-6'>
				<div className='grid grid-cols-4'>
					<div className=''>
						<img
							className='mb-3 w-32 h-32 rounded-full shadow-lg'
							src='/images/study1.png'
							alt='user'
						/>
					</div>
					<div className='col-span-3'>
						<div>
							<h1>User Name</h1>
						</div>
						<div>test@gmail.com</div>
					</div>
				</div>
				<div>
					<Form
						onSubmit={() => {
							return
						}}
						render={() => (
							<div>
								<div>
									<label htmlFor='fullname' className='text-sm'>
										Full name
									</label>
									<Input name='fullname' type='text' />
								</div>
								<div>
									<label htmlFor='email' className='text-sm'>
										Email
									</label>
									<Input name='email' type='email' />
								</div>
							</div>
						)}
					/>
				</div>
			</Card>
		</PageWrapper>
	)
}
