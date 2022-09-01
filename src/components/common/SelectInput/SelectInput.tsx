import { useEffect, useRef, useState } from 'react'
import { Field, FieldInputProps } from 'react-final-form'
import { InputLabel } from 'common/InputLabel'
import { Select } from 'common/Select'
import { SelectInputProps } from './SelectInput.types'

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const SelectInput = <T extends unknown>({
	className,
	testId = 'SelectInput',
	name,
	isMulti,
	options,
	components,
	labelClassName,
	placeholder,
	label,
	isClearable,
	defaultValue,
	showError = true
}: SelectInputProps<T>) => {
	const inputRef = useRef<FieldInputProps<File, HTMLElement>>()
	const [defaultSet, setDefaultSet] = useState(false)

	useEffect(() => {
		if (defaultSet) return
		if (defaultValue && inputRef.current) {
			inputRef.current.onChange(defaultValue)
			setDefaultSet(true)
		}
	}, [defaultValue, defaultSet, setDefaultSet])

	return (
		<div data-testid={testId}>
			<InputLabel className={labelClassName} name={name} label={label} />

			<Field name={name} className={className}>
				{({ input, meta }) => {
					const isError = meta.error && meta.touched
					inputRef.current = input

					return (
						<>
							<Select
								isClearable={isClearable}
								placeholder={placeholder}
								name={input.name}
								value={input.value}
								onChange={input.onChange}
								isMulti={isMulti}
								options={options}
								components={components}
								styles={{
									control: (base) => ({
										...base,
										borderColor: isError ? 'red' : '#ced4da'
									})
								}}
							/>

							{isError && showError && (
								<>
									<span className='text-xs text-red-500 mt-5'>
										{'*'} {meta.error}
									</span>
								</>
							)}
						</>
					)
				}}
			</Field>
		</div>
	)
}
