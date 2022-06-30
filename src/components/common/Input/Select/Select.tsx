/* eslint-disable react/jsx-no-literals */

/** @jsxRuntime classic */

/** @jsx jsx */
import { jsx } from '@emotion/react'
import cn from 'classnames'
import Image from 'next/image'
import S, { GroupBase, MultiValueGenericProps, OptionProps, components } from 'react-select'
import { SelectComponents } from 'react-select/dist/declarations/src/components'
import { selectOptionsType } from 'types/index'
import { SelectProps } from './Select.types'
import { selectStyles } from './styles'

const MultiValueLabel = (props: MultiValueGenericProps<selectOptionsType>) => {
	return (
		<div className='flex items-center gap-1 pr-2'>
			<Image src={`/icons/consents.svg`} width='20' height='20' alt='Data type icon' />

			<components.MultiValueLabel {...props} />
		</div>
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
			<div className='flex items-center gap-2'>
				<Image src={`/icons/gray_consents.svg`} width='20' height='20' alt='Data type icon' />

				{children}
			</div>
		</div>
	)
}

export const Select = ({
	className,
	testId = 'Select',
	props,
	isMulti,
	selectOptions
}: SelectProps) => {
	return (
		<div className={className} data-testid={testId}>
			<S
				menuIsOpen={true}
				name={props.input.name}
				value={props.input.value}
				onChange={props.input.onChange}
				isMulti={isMulti}
				options={selectOptions}
				classNamePrefix='react-select'
				components={
					{ MultiValueLabel, Option } as Partial<
						SelectComponents<selectOptionsType, true, GroupBase<selectOptionsType>>
					>
				}
				styles={selectStyles}
			/>
		</div>
	)
}
