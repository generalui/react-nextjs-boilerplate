import { ReactNode } from 'react'
import { FormProps as FinalFormProps } from 'react-final-form'
import { CommonProps } from 'types/CommonProps'
import { TodoInputPreTransform } from 'types/Todo'

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

export interface TodoFormProps extends BaseFormProps<TodoInputPreTransform> {
	create?: boolean
	isLoading: boolean
}
