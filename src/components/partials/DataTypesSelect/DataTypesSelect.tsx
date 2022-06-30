/* eslint-disable react/jsx-no-literals */

/** @jsxRuntime classic */

/** @jsx jsx */
import { jsx } from '@emotion/react'
import cn from 'classnames'
import Image from 'next/image'
import {
	GroupBase,
	MultiValueGenericProps,
	OptionProps,
	StylesConfig,
	components
} from 'react-select'
import { SelectComponents } from 'react-select/dist/declarations/src/components'
import { selectOptionsType } from 'types/index'
import { useText } from 'hooks/useText'
import { SelectInput } from 'common/SelectInput'
import { DataTypesSelectProps } from './DataTypesSelect.types'
import { dataTypesStyles } from './styles'

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

export const DataTypesSelect = ({ testId = 'DataTypesSelect' }: DataTypesSelectProps<unknown>) => {
	const { t } = useText('createStudy')

	const studyDataTypes: selectOptionsType[] = [
		{ label: t('dataTypes.consents'), value: 'consents' },
		{ label: t('dataTypes.geneticData'), value: 'geneticData' },
		{ label: t('dataTypes.healthRecords'), value: 'healthRecords' },
		{ label: t('dataTypes.specimens'), value: 'specimens' }
	]

	return (
		<SelectInput
			data-testid={testId}
			isMulti={true}
			name='dataTypes'
			options={studyDataTypes}
			components={
				{ MultiValueLabel, Option } as Partial<SelectComponents<unknown, true, GroupBase<unknown>>>
			}
			styles={dataTypesStyles as StylesConfig<unknown, true, GroupBase<unknown>>}
		/>
	)
}
