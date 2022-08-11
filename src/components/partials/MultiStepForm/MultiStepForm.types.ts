import { CommonProps } from 'types/CommonProps'

export interface MultiStepFormProps extends CommonProps {
	steps: JSX.Element[]
	name: string
}
