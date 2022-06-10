import cn from 'classnames'
import { memo } from 'react'
import { Field } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'
import { InputProps } from './Input.types'

export const Input = memo(function Input({
	className,
	placeholder,
	id,
	name,
	type,
	onChange,
	testId = 'Input'
}: InputProps) {
	return (
		<>
			<Field name={name as string}>
				{(props) => (
					<input
						name={props.input.name}
						id={id}
						className={cn('input input-bordered block w-full', className)}
						placeholder={placeholder}
						type={type}
						data-testid={testId}
						value={props.input.value}
						onChange={props.input.onChange}
					/>
				)}
			</Field>
			{onChange && (
				<OnChange name={name as string}>
					{(value, previous) => {
						onChange(value, previous)
					}}
				</OnChange>
			)}
		</>
	)
})
