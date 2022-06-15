import cn from 'classnames'
import { Field } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'
import { TextArea } from 'common/TextArea'
import { InputProps } from './Input.types'

export const Input = ({
	className,
	placeholder,
	id,
	name,
	type,
	onChange,
	testId = 'Input',
	rows = 4
}: InputProps) => {
	return (
		<>
			<Field name={name as string}>
				{(props) =>
					type === 'textarea' ? (
						<TextArea
							rows={rows}
							placeholder={placeholder}
							name={props.input.name}
							value={props.input.value}
							onChange={props.input.onChange}
						/>
					) : (
						<input
							data-testid={testId}
							name={props.input.name}
							id={id || name}
							className={cn('input input-bordered block w-full', className)}
							placeholder={placeholder}
							type={type}
							value={props.input.value}
							onChange={props.input.onChange}
						/>
					)
				}
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
}
