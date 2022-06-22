/* eslint-disable react/display-name */
import cn from 'classnames'
import { LegacyRef, forwardRef } from 'react'
import { Field } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'
import { TextArea } from 'common/TextArea'
import { InputProps } from './Input.types'

export const Input = forwardRef(
	(
		{
			className,
			placeholder,
			id,
			name,
			type,
			onChange,
			testId = 'Input',
			rows = 4,
			disabled
		}: InputProps,
		reference
	) => {
		return (
			<>
				<Field name={name}>
					{(props) =>
						type === 'textarea' ? (
							<TextArea
								rows={rows}
								placeholder={placeholder}
								name={props.input.name}
								value={props.input.value}
								onChange={props.input.onChange}
								disabled={disabled}
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
								ref={reference as LegacyRef<HTMLInputElement>}
								disabled={disabled}
							/>
						)
					}
				</Field>
				{onChange && (
					<OnChange name={name}>
						{(value, previous) => {
							onChange(value, previous)
						}}
					</OnChange>
				)}
			</>
		)
	}
)
