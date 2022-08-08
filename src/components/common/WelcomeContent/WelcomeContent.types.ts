import { CommonProps } from 'types/CommonProps'

export interface WelcomeContentProps extends CommonProps {
	description: string
	title: string
}

export type AdminWelcomeProps = Omit<WelcomeContentProps, 'description' | 'title'>

export interface ParticipantWelcomeProps
	extends Omit<WelcomeContentProps, 'description' | 'title'> {
	participantName: string
}
