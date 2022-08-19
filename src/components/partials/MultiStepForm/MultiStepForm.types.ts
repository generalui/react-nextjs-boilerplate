import { ReactNode } from 'react'
import { CommonProps } from 'types/CommonProps'

export interface MultiStepFormProps extends CommonProps {
	header?: ReactNode
	currentStep: number
	title?: ReactNode
	steps: JSX.Element[]
	inProgress?: boolean
	name: string
}
