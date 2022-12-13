/*!
 * UpdatePassword Page
 */
import { PageWrapper } from 'partials/PageWrapper'
import { UpdatePasswordForm } from 'partials/UpdatePasswordForm'
import { Card } from 'common/Card'
import { UpdatePasswordProps } from './UpdatePassword.types'

export const UpdatePassword = function UpdatePassword({
	testId = 'UpdatePassword'
}: UpdatePasswordProps) {
	return (
		<PageWrapper title='UpdatePassword' testId={testId}>
			<Card>
				<UpdatePasswordForm />
			</Card>
		</PageWrapper>
	)
}
