import { useText } from 'hooks/useText'
import { WelcomeContent } from './WelcomeContent'
import { ParticipantWelcomeProps } from './WelcomeContent.types'

export const ParticipantWelcome = ({
	className,
	participantName,
	testId = 'ParticipantWelcome'
}: ParticipantWelcomeProps) => {
	const { t } = useText('participant.welcome')

	return (
		<WelcomeContent
			className={className}
			description={t('description')}
			testId={testId}
			title={t('title', [participantName])}
		/>
	)
}
