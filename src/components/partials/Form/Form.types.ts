import { FormProps as FinalFormProps } from 'react-final-form'
import { CommonProps } from 'types/CommonProps'
import { StudyInput } from 'types/Study'

export interface FormProps<T extends Record<string, unknown>> extends CommonProps {
	onSubmit: (values: T) => void
	render: FinalFormProps<T>['render']
}

export interface StudyFormProps extends Omit<FormProps<StudyInput>, 'render'> {
	isError: boolean
	isLoading: boolean
}
