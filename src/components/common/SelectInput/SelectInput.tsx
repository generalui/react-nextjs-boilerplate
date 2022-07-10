import { Field } from 'react-final-form'
import { Select } from '../Select/Select'
import { SelectInputProps } from './SelectInput.types'

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const SelectInput = <T extends unknown>({
	className,
	testId = 'SelectInput',
	name,
	isMulti,
	options,
	components,
	styles
}: SelectInputProps<T>) => {
	return (
		<div data-testid={testId}>
			<Field name={name} className={className}>
				{(props) => (
					<Select
						name={props.input.name}
						value={props.input.value}
						onChange={props.input.onChange}
						isMulti={isMulti}
						options={options}
						components={components}
						styles={styles}
					/>
				)}
			</Field>
		</div>
	)
}
