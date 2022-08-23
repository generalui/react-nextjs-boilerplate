import { CommonProps } from 'types/CommonProps'

export interface WelcomeContentProps extends CommonProps {
	description: string
	isParticipant?: boolean
	title: string
}

export type AdminWelcomeProps = Omit<WelcomeContentProps, 'isParticipant' | 'description' | 'title'>

export interface ParticipantWelcomeProps
	extends Omit<WelcomeContentProps, 'isParticipant' | 'description' | 'title'> {
	participantName: string
}
