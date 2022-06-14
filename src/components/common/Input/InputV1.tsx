import cn from 'classnames'
import { InputPropsV1 } from './Input.types'

export const InputV1 = ({
	className,
	placeholder,
	id,
	type = 'text',
	value,
	onChange,
	testId = 'Input'
}: InputPropsV1) => {
	return (
		<input
			className={cn('input input-bordered block w-full', className)}
			id={id}
			placeholder={placeholder}
			type={type}
			data-testid={testId}
			value={value}
			onChange={onChange}
		/>
	)
}
