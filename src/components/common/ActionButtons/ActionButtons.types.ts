import { CommonProps } from 'types/CommonProps'

export interface ActionButtonsProps extends CommonProps {
	localizationScope: string
	submitText?: string
	cancelText?: string
}
