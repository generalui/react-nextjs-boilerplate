import { CommonProps } from 'types/CommonProps'

export interface ModalFooterButtonsProps extends CommonProps {
	actionButtonHandler: () => void
	actionButtonLabel?: string
	modalName: string
}
