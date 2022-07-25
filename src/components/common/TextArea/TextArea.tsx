import cn from 'classnames'
import { TextAreaProps } from './TextArea.types'

export const TextArea = ({
	className,
	placeholder,
	name,
	value,
	onChange,
	id,
	testId = 'TextArea',
	rows = 4,
	disabled,
	error
}: TextAreaProps) => {
	return (
		<textarea
			placeholder={placeholder}
			name={name}
			rows={rows}
			id={id || name}
			value={value}
			onChange={onChange}
			className={cn(
				'block p-2.5 w-full text-sm text-gray-900 rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none',
				error ? 'border-red-500' : 'border-gray-300  dark:border-gray-600',
				className
			)}
			data-testid={testId}
			disabled={disabled}
		/>
	)
}
