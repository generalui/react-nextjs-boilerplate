import S from 'react-select'
import { SelectProps } from './Select.types'

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const Select = <T extends unknown>({
	className,
	testId = 'Select',
	isMulti,
	options,
	components,
	styles,
	name,
	value,
	onChange
}: SelectProps<T>) => {
	return (
		<div className={className} data-testid={testId}>
			<S
				name={name}
				value={value}
				onChange={onChange}
				isMulti={isMulti}
				options={options}
				classNamePrefix='react-select'
				components={components}
				styles={styles}
			/>
		</div>
	)
}
