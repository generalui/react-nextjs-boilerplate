import { ReactNode } from 'react'
import { CommonProps } from 'types/CommonProps'

export interface ModalButtonProps extends CommonProps {
	buttonTitle: string | ReactNode
	modalTitle: string | ReactNode
	name: string
}
