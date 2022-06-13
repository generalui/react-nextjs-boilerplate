import { ModalProps as MP } from 'flowbite-react'
import { ReactNode } from 'react'
import { CommonProps } from 'types/CommonProps'

export interface ModalProps extends CommonProps, MP {
	title?: string | ReactNode
	footer?: string | ReactNode
}
