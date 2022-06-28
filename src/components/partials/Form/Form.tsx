import { Form as FinalForm } from 'react-final-form'
import { FormProps } from './Form.types'

export const Form = <T extends Record<string, unknown>>({
	className,
	initialValues,
	onSubmit,
	render,
	testId = 'Form'
}: FormProps<T>) => {
	return (
		<FinalForm
			className={className}
			data-testid={testId}
			initialValues={initialValues}
			onSubmit={onSubmit}
			render={render}
		/>
	)
}
