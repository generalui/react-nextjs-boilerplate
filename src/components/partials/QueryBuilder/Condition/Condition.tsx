import cn from 'classnames'
import { useEffect, useState } from 'react'
import { MultiValue, OptionProps, SingleValue } from 'react-select'
import { OptionType } from 'types/QueryBuilder'
import { useText } from 'hooks/useText'
import { Input } from 'common/Input'
import { SelectInput } from 'common/SelectInput'
import { Text } from 'common/Text'
import { ConditionProps } from './Condition.types'

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

export const Condition = ({
	className,
	fields,
	conditions,
	testId = 'Condition'
}: ConditionProps) => {
	const [fieldInputType, setFieldInputType] = useState<string | undefined>()
	const [filteredConditions, setFilteredConditions] = useState<OptionType[]>(conditions)

	const { t } = useText('common.queryBuilder.conditions')

	const handleFieldChange = (newValue: SingleValue<OptionType> | MultiValue<OptionType>) => {
		if (newValue && 'inputType' in newValue) {
			setFieldInputType(newValue?.inputType)
		}
	}

	useEffect(() => {
		if (fieldInputType) {
			const newConditions = conditions.filter((condition) =>
				condition.allowedFieldTypes?.includes(fieldInputType)
			)
			setFilteredConditions(newConditions)
		}
	}, [conditions, fieldInputType])

	return (
		<div className={className} data-testid={testId}>
			<div className='grid grid-rows-2 grid-flow-row grid-cols-7 gap-x-4 items-center'>
				<Text size='xs' className='text-gray1-500 font-semibold col-span-3'>
					{t('fields')}
				</Text>
				<Text size='xs' className='text-gray-500 font-semibold col-span-2'>
					{t('condition')}
				</Text>
				<Text size='xs' className='text-gray-500 font-semibold col-span-2'>
					{t('value')}
				</Text>
				<div className='col-span-3'>
					<SelectInput
						name='field'
						options={fields}
						components={{ Option }}
						onChange={handleFieldChange}
					/>
				</div>
				<div className='col-span-2'>
					<SelectInput<OptionType> name='condition' options={filteredConditions} />
				</div>
				<div className='col-span-2'>
					<Input name='value' type={fieldInputType} />
				</div>
			</div>
		</div>
	)
}
