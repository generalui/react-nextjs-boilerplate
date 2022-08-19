import { ReactNode } from 'react'
import { FormProps as FinalFormProps } from 'react-final-form'
import { CommonProps } from 'types/CommonProps'
import { StudyInputPreTransform } from 'types/Study'

export interface BaseFormProps<T extends Record<string, unknown>> extends CommonProps {
	title?: ReactNode
	initialValues?: T
	onSubmit: (values: T) => void
	onCancel?: (error: unknown) => void
	submitText?: string
	validate?: FinalFormProps<T>['validate']
	keepDirtyOnReinitialize?: FinalFormProps<T>['keepDirtyOnReinitialize']
}

export interface FormProps<T extends Record<string, unknown>> extends BaseFormProps<T> {
	render: Required<FinalFormProps<T>>['render']
}

export interface StudyFormProps extends BaseFormProps<StudyInputPreTransform> {
	create?: boolean
	isLoading: boolean
}
