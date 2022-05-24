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
			className={cn(
				'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50',
				className
			)}
			id={id}
			placeholder={placeholder}
			type={type}
			data-testid={props['data-testid']}
			value={value}
			onChange={onChange}
		/>
	)
}
