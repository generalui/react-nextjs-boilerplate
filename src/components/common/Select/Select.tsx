import S from 'react-select'
import { SelectComponent } from './Select.types'

export const Select: SelectComponent = ({
	className,
	testId = 'Select',
	isMulti,
	options,
	components,
	styles,
	name,
	value,
	isClearable,
	placeholder,
	onChange
}) => {
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
				isClearable={isClearable}
				placeholder={placeholder}
			/>
		</div>
	)
}
