/*!
 * Settings Page
 */
import { PageWrapper } from 'partials/PageWrapper'
import { UpdatePasswordForm } from 'partials/UpdatePasswordForm'
import { Card } from 'common/Card'
import { SettingsProps } from './Settings.types'

export const Settings = function Settings({ testId = 'Settings' }: SettingsProps) {
	return (
		<PageWrapper title='Settings' testId={testId}>
			<Card>
				<UpdatePasswordForm />
			</Card>
		</PageWrapper>
	)
}
