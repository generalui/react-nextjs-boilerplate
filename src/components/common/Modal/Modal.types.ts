import { ModalPositions, ModalSizes } from 'flowbite-react'
import { ReactNode } from 'react'
import { CommonProps } from 'types/CommonProps'

export interface ModalProps extends CommonProps {
	title?: string | ReactNode
	footer?: string | ReactNode
	onClose?: () => void
	position?: keyof ModalPositions
	popup?: boolean
	root?: HTMLElement
	show?: boolean
	size?: keyof ModalSizes
}
