import { CommonProps } from 'types/CommonProps'

export interface MultiStepFormProps<T> extends CommonProps {
	stepComponents: JSX.Element[]
	results: T
}
