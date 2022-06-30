import { ReactNode } from 'react'
import { CommonProps } from 'types/CommonProps'
import { ButtonProps } from 'common/Button/Button.types'

export interface ModalButtonProps extends CommonProps {
	buttonChildren: string | ReactNode
	modalTitle: string | ReactNode
	name: string
	v?: ButtonProps['v']
}
