import S from 'react-select'
import { SelectProps } from './Select.types'

export const Select = ({
	className,
	testId = 'Select',
	isMulti,
	options,
	components,
	styles,
	name,
	value,
	onChange
}: SelectProps<unknown>) => {
	return (
		<div className={className} data-testid={testId}>
			<S
				menuIsOpen={true}
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
