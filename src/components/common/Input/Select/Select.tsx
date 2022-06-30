/* eslint-disable react/jsx-no-literals */

/** @jsxRuntime classic */

/** @jsx jsx */
import { jsx } from '@emotion/react'
import cn from 'classnames'
import Image from 'next/image'
import S, { GroupBase, MultiValueRemoveProps, OptionProps, StylesConfig } from 'react-select'
import { SelectComponents } from 'react-select/dist/declarations/src/components'
import { selectOptionsType } from 'types/index'
import { SelectProps } from './Select.types'

const MultiValue = (props: MultiValueRemoveProps<selectOptionsType>) => {
	return (
		<div {...props}>
			<div className='flex items-center gap-2'>
				<Image src={`/icons/consents.svg`} width='20' height='20' alt='Data type icon' />

				{props.children}
			</div>
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
				<Image src={`/icons/consents.svg`} width='20' height='20' alt='Data type icon' />

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
	const selectStyles: StylesConfig<any, true> = {
		option: (base, { isFocused, isSelected }) => ({
			...base,
			backgroundColor: isFocused || isSelected ? '#d5f2ff' : undefined
		}),
		multiValue: (base) => ({ ...base, backgroundColor: '#d5f2ff' })
	}

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
					{ MultiValue, Option } as Partial<
						SelectComponents<selectOptionsType, true, GroupBase<selectOptionsType>>
					>
					// { MultiValue }
				}
				styles={selectStyles}
			/>
		</div>
	)
}
