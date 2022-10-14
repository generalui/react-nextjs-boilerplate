import cn from 'classnames'
import { MultiValueGenericProps, OptionProps, SingleValueProps, components } from 'react-select'
import { SelectOptionsType } from 'types/index'
import { capitalizeFirstLetter } from 'utils/client/text'
import { DataTypeLabel } from 'common/DataTypeLabel'
import { IconProps } from 'common/Icon/Icon.types'
import { SelectInput } from 'common/SelectInput'
import { DataTypesSelectProps } from './DataTypesSelect.types'

const MultiValueLabel = (props: MultiValueGenericProps<SelectOptionsType>) => {
	const { value } = props.data
	return (
		<DataTypeLabel
			icon={capitalizeFirstLetter(value) as IconProps['icon']}
			iconClassname='text-primary'
			size='sm'
			dataType={value}
		>
			<components.MultiValueLabel {...props} />
		</DataTypeLabel>
	)
}

const SingleValue = (props: SingleValueProps<SelectOptionsType>) => {
	const { value } = props.data
	return (
		<DataTypeLabel
			icon={capitalizeFirstLetter(value) as IconProps['icon']}
			iconClassname='text-gray-500'
			size='sm'
			dataType={value}
		>
			<components.SingleValue {...props} />
		</DataTypeLabel>
	)
}

const Option = (props: OptionProps<SelectOptionsType>) => {
	const { children, className, cx, isDisabled, isFocused, isSelected, innerRef, innerProps, data } =
		props
	const { value } = data
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
			<DataTypeLabel className='gap-2' img={`/icons/gray_${value}.svg`} dataType={value}>
				{children}
			</DataTypeLabel>
		</div>
	)
}

export const DataTypesSelect = ({
	options,
	className,
	testId = 'DataTypesSelect',
	labelClassName,
	label,
	isMulti,
	isClearable,
	name
}: DataTypesSelectProps<SelectOptionsType>) => {
	return (
		<div data-testid={testId} className={className}>
			<SelectInput<SelectOptionsType>
				labelClassName={labelClassName}
				label={label}
				data-testid={testId}
				isMulti={isMulti}
				name={name}
				options={options}
				components={{ MultiValueLabel, Option, SingleValue }}
				isClearable={isClearable}
			/>
		</div>
	)
}
