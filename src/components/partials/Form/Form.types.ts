import { FormProps as FinalFormProps } from 'react-final-form'
import { CommonProps } from 'types/CommonProps'
import { StudyInputPreTransform } from 'types/Study'

export interface FormProps<T extends Record<string, unknown>> extends CommonProps {
	initialValues?: T
	onSubmit: (values: T) => void
	render: Required<FinalFormProps<T>>['render']
	submitText?: string
	validate?: FinalFormProps<T>['validate']
	keepDirtyOnReinitialize?: FinalFormProps<T>['keepDirtyOnReinitialize']
}

export interface StudyFormProps extends Omit<FormProps<StudyInputPreTransform>, 'render'> {
	create?: boolean
	isLoading: boolean
	onCancel: () => void
}
