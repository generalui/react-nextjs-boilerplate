import cn from 'classnames'
import { InputProps } from './Input.types'

export const Input = ({
	className,
	placeholder,
	id,
	type,
	value,
	onChange,
	...props
}: InputProps) => {
	return (
		<input
			className={cn('input input-bordered block w-full', className)}
			id={id}
			placeholder={placeholder}
			type={type}
			data-testid={props['data-testid']}
			value={value}
			onChange={onChange}
		/>
	)
}
