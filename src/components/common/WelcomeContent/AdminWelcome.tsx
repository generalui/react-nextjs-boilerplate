import { useText } from 'hooks/useText'
import { WelcomeContent } from './WelcomeContent'
import { AdminWelcomeProps } from './WelcomeContent.types'

export const AdminWelcome = ({ className, testId = 'AdminWelcome' }: AdminWelcomeProps) => {
	const { t } = useText('client.about')

	return (
		<WelcomeContent
			className={className}
			description={t('description')}
			testId={testId}
			title={t('title')}
		/>
	)
}
