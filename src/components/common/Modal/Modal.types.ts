import { ReactNode } from 'react'
import { CommonProps } from 'types/CommonProps'
import { Sizes } from 'types/Sizes'

export interface ModalProps extends CommonProps {
	title?: string | ReactNode
	footer?: string | ReactNode
	onClose?: () => void
	show?: boolean
	bodyClassName?: string
	size?: Sizes
}
