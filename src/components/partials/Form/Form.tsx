import { Form as FinalForm } from 'react-final-form'
import { FormProps } from './Form.types'

export const Form = <T extends Record<string, unknown>>({
	className,
	onSubmit,
	render,
	testId = 'Form'
}: FormProps<T>) => {
	return (
		<FinalForm className={className} data-testid={testId} onSubmit={onSubmit} render={render} />
	)
}
