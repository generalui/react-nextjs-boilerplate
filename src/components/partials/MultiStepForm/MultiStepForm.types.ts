import { CommonProps } from 'types/CommonProps'

type Steps<T> = {
	component: JSX.Element
	// reducer: (state: T, action: string) => T
}

export interface MultiStepFormProps<T> extends CommonProps {
	steps: Steps<T>[]
}
