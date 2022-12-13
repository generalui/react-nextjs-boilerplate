/*!
 * UpdatePassword Page
 */
import { useText } from 'hooks/useText'
import { PageWrapper } from 'partials/PageWrapper'
import { UpdatePasswordForm } from 'partials/UpdatePasswordForm'
import { Card } from 'common/Card'
import { UpdatePasswordProps } from './UpdatePassword.types'

export const UpdatePassword = function UpdatePassword({
	testId = 'UpdatePassword'
}: UpdatePasswordProps) {
	const { t } = useText('settings.admin')

	return (
		<PageWrapper title={t('title')} testId={testId}>
			<Card title={t('title')} iconProps={{ className: 'text-white', icon: 'Cog8ToothIcon' }}>
				<UpdatePasswordForm />
			</Card>
		</PageWrapper>
	)
}
