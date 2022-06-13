import cn from 'classnames'
import { InputProps } from './Input.types'

export const Input = ({
	className,
	placeholder,
	id,
	type,
	value,
	onChange,
	testId = 'Input'
}: InputProps) => {
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
