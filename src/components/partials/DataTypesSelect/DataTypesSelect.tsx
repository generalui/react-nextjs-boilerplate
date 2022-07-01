/* eslint-disable react/jsx-no-literals */

/** @jsxRuntime classic */

/** @jsx jsx */
import { jsx } from '@emotion/react'
import cn from 'classnames'
import Image from 'next/image'
import { MultiValueGenericProps, OptionProps, components } from 'react-select'
import { selectOptionsType } from 'types/index'
import { DataTypeLabel } from 'common/DataTypeLabel'
import { SelectInput } from 'common/SelectInput'
import { DataTypesSelectProps } from './DataTypesSelect.types'
import { dataTypesStyles } from './styles'

const MultiValueLabel = (props: MultiValueGenericProps<selectOptionsType>) => {
	return (
		<DataTypeLabel img={'/icons/consents.svg'}>
			<components.MultiValueLabel {...props} />
		</DataTypeLabel>
	)
}

const Option = (props: OptionProps<selectOptionsType>) => {
	const {
		children,
		className,
		cx,
		getStyles,
		isDisabled,
		isFocused,
		isSelected,
		innerRef,
		innerProps
	} = props
	return (
		<div
			ref={innerRef}
			css={getStyles('option', props)}
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
			<DataTypeLabel img={'/icons/gray_consents.svg'}>{children}</DataTypeLabel>
		</div>
	)
}

export const DataTypesSelect = ({
	options,
	testId = 'DataTypesSelect'
}: DataTypesSelectProps<selectOptionsType>) => {
	return (
		<SelectInput<selectOptionsType>
			data-testid={testId}
			isMulti={true}
			name='dataTypes'
			options={options}
			components={{ MultiValueLabel, Option }}
			styles={dataTypesStyles}
		/>
	)
}
