import cn from 'classnames'
import { useState } from 'react'
import { MultiValue, OptionProps, SingleValue } from 'react-select'
import participants from 'utils/conditionsStructure'
import { useText } from 'hooks/useText'
import { Input } from 'common/Input'
import { SelectInput } from 'common/SelectInput'
import { Text } from 'common/Text'
import { ConditionProps } from './Condition.types'

type OptionType = {
	label: string
	value: string
	type?: 'option' | 'mainField'
	isDisabled?: boolean
	inputType?: string
}

const Option = (props: OptionProps<OptionType>) => {
	const { children, className, cx, isDisabled, isFocused, isSelected, innerRef, innerProps, data } =
		props
	const { type } = data
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
				cn(className, type === 'mainField' && 'font-semibold')
			)}
			{...innerProps}
		>
			{children}
		</div>
	)
}

export const Condition = ({ className, testId = 'Condition' }: ConditionProps) => {
	const [inputType, setInputType] = useState<string>('text')
	const { t } = useText('participants.conditions')

	const fields: OptionType[] = Object.entries(participants.conditions.fields).flatMap(
		([key, value]) => {
			const fieldOptions: OptionType[] = Object.entries(
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				participants.conditions.fields[key].options
			).map(([key, value]) => {
				try {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					return value.map((item) => {
						return {
							label: t(item.key),
							value: key,
							type: 'option'
						}
					})
				} catch (error) {
					return {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-expect-error
						label: t(value.key),
						value: key,
						type: 'option'
					}
				}
			})

			return [
				{
					label: t(value.title.key),
					value: key,
					type: 'mainField',
					isDisabled: true
				},
				...fieldOptions
			]
		}
	)

	const conditions: OptionType[] = Object.entries(participants.conditions.condition.options).map(
		([key, value]) => {
			return {
				label: t(value.label.key),
				value: key,
				inputType: t(value.inputType.key)
			}
		}
	)

	const handleInputType = (newValue: SingleValue<OptionType> | MultiValue<OptionType>) => {
		if (newValue && 'inputType' in newValue) {
			const newInputType = newValue?.inputType || 'text'
			setInputType(newInputType)
		}
	}

	return (
		<div className={className} data-testid={testId}>
			<div className='grid grid-rows-2 grid-flow-row grid-cols-7 gap-x-4 items-center'>
				<Text size='xs' className='text-gray1-500 font-semibold col-span-3'>
					{t('fields.title')}
				</Text>
				<Text size='xs' className='text-gray-500 font-semibold col-span-2'>
					{t('condition.title')}
				</Text>
				<Text size='xs' className='text-gray-500 font-semibold col-span-2'>
					{t('value')}
				</Text>
				<div className='col-span-3'>
					<SelectInput name='field' options={fields} components={{ Option }} />
				</div>
				<div className='col-span-2'>
					<SelectInput<OptionType>
						name='condition'
						options={conditions}
						onChange={handleInputType}
					/>
				</div>
				<div className='col-span-2'>
					<Input name='value' type={inputType} />
				</div>
			</div>
		</div>
	)
}
