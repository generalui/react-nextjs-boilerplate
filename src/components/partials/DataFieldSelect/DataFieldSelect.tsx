import cn from 'classnames'
import { MultiValueGenericProps, OptionProps, SingleValueProps, components } from 'react-select'
import { selectOptionsType } from 'types/index'
import { DataTypeLabel } from 'common/DataTypeLabel'
import { SelectInput } from 'common/SelectInput'
import { DataFieldSelectProps } from './DataFieldSelect.types'

const MultiValueLabel = (props: MultiValueGenericProps<selectOptionsType>) => {
	const { value } = props.data
	return (
		<DataTypeLabel img={`/icons/${value}.svg`} dataType={value}>
			<components.MultiValueLabel {...props} />
		</DataTypeLabel>
	)
}

const SingleValue = (props: SingleValueProps<selectOptionsType>) => {
	return <components.SingleValue {...props} />
}

const Option = (props: OptionProps<selectOptionsType>) => {
	const { children, className, cx, isDisabled, isFocused, isSelected, innerRef, innerProps } = props
	return (
		<div
			ref={innerRef}
			className={cx(
				{
					option: true,
					'option--is-disabled': isDisabled,
					'option--is-focused': isFocused,
					'option--is-selected': isSelected
				},
				cn(className)
			)}
			{...innerProps}
		>
			{children}
		</div>
	)
}

export const DataFieldSelect = ({
	options,
	className,
	testId = 'DataFieldSelect',
	labelClassName,
	label,
	isMulti,
	isClearable,
	name,
	defaultValue,
	placeholder,
	showError = true
}: DataFieldSelectProps<selectOptionsType>) => {
	return (
		<div data-testid={testId} className={className}>
			<SelectInput<selectOptionsType>
				labelClassName={labelClassName}
				label={label}
				data-testid={testId}
				isMulti={isMulti}
				name={name}
				options={options}
				defaultValue={defaultValue}
				placeholder={placeholder}
				components={{ MultiValueLabel, Option, SingleValue }}
				isClearable={isClearable}
				showError={showError}
			/>
		</div>
	)
}
