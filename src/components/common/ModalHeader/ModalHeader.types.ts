import { CommonProps } from 'types/CommonProps'

export interface ModalHeaderProps extends CommonProps {
	title: string
	onClose?: () => void
}
