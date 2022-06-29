/* eslint-disable react/display-name */
import cn from 'classnames'
import { LegacyRef, forwardRef } from 'react'
import { Field } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'
import Select from 'react-select'
import { StylesConfig } from 'react-select'
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
			disabled,
			isMulti,
			selectOptions
		}: InputProps,
		reference
	) => {
		const selectStyles: StylesConfig<any, true> = {
			option: (styles) => ({
				...styles,
				':hover': { background: '#d5f2ff' },
				':focus': {
					...styles[':active'],
					background: '#d5f2ff'
				}
			}),
			multiValue: (styles) => ({ ...styles, background: '#d5f2ff' })
		}

		return (
			<>
				<Field name={name}>
					{(props) => {
						switch (type) {
							case 'textarea':
								return (
									<TextArea
										rows={rows}
										placeholder={placeholder}
										name={props.input.name}
										value={props.input.value}
										onChange={props.input.onChange}
										disabled={disabled}
									/>
								)
							case 'select':
								return (
									<Select
										name={props.input.name}
										value={props.input.value}
										onChange={props.input.onChange}
										isMulti={isMulti}
										options={selectOptions}
										styles={selectStyles}
									/>
								)
							default:
								return (
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
					}}
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
