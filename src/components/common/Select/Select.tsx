import cn from 'classnames'
import S from 'react-select'
import moduleStyles from './Select.module.scss'
import { SelectComponent } from './Select.types'

export const Select: SelectComponent = ({
	className,
	components,
	isMulti,
	isClearable,
	name,
	onChange,
	options,
	placeholder,
	styles,
	testId = 'Select',
	value
}) => {
	return (
		<div className={cn(moduleStyles.reactSelect, className)} data-testid={testId}>
			<S
				isClearable={isClearable}
				placeholder={placeholder}
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
