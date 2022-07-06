import { FormProps as FinalFormProps } from 'react-final-form'
import { CommonProps } from 'types/CommonProps'
import { StudyInput } from 'types/Study'

export interface FormProps<T extends Record<string, unknown>> extends CommonProps {
	initialValues?: T
	onSubmit: (values: T) => void
	render: Required<FinalFormProps<T>>['render']
	submitText?: string
	validate?: FinalFormProps<T>['validate']
}

export interface StudyFormProps extends Omit<FormProps<StudyInput>, 'render'> {
	isLoading: boolean
	onCancel: () => void
}
