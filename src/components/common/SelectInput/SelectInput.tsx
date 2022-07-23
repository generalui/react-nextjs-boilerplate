import { Field } from 'react-final-form'
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
	styles,
	labelClassName,
	isClearable,
	label
}: SelectInputProps<T>) => {
	return (
		<div data-testid={testId}>
			<InputLabel className={labelClassName} name={name} label={label} />

			<Field name={name} className={className}>
				{(props) => (
					<>
						<Select
							name={props.input.name}
							value={props.input.value}
							onChange={props.input.onChange}
							isMulti={isMulti}
							options={options}
							components={components}
							styles={styles}
							isClearable={isClearable}
						/>
						{/* TODO: render errors here */}
					</>
				)}
			</Field>
		</div>
	)
}
