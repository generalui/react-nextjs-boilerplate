import cn from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { FieldInputProps } from 'react-final-form'
import { FormSpy } from 'react-final-form'
import { MultiValue, OptionProps, SingleValue } from 'react-select'
import {
	FilterInput,
	FilterInputWithModel,
	FilterSchema,
	OptionType,
	QueryBuilderModel,
	QueryInputType
} from 'types/QueryBuilder'
import { debounce } from 'utils/debounce'
import { useText } from 'hooks/useText'
import { Form } from 'partials/Form'
import { Input } from 'common/Input'
import { SelectInput } from 'common/SelectInput'
import { Text } from 'common/Text'
import { FilterProps } from './Filter.types'

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
				cn(className, type === 'header' && 'font-semibold')
			)}
			{...innerProps}
		>
			{children}
		</div>
	)
}

export const Filter = ({
	className,
	fields,
	conditions,
	filterTypes,
	filterKey,
	firstItem,
	updateFiltersArray,
	onFieldTypeChange,
	onModelChange,
	testId = 'Filter'
}: FilterProps) => {
	const [fieldInputType, setFieldInputType] = useState<string | undefined>()
	const [fieldModel, setFieldModel] = useState<QueryBuilderModel | undefined>()
	const [value, setValue] = useState<string | undefined>()
	const [filteredConditions, setFilteredConditions] = useState<OptionType[]>(conditions)
	const inputRef = useRef<FieldInputProps<string>>()
	const { t } = useText('queryBuilder.filters')

	const handleFieldChange = (newValue: SingleValue<OptionType> | MultiValue<OptionType>) => {
		if (newValue && 'inputType' in newValue) {
			setFieldInputType(newValue?.inputType)
			setFieldModel(newValue?.model)
			setValue(newValue?.value)
		}
	}

	useEffect(() => {
		onFieldTypeChange(fieldInputType)
	}, [fieldInputType, onFieldTypeChange])

	useEffect(() => {
		onModelChange(fieldModel)
	}, [fieldModel, onModelChange])

	useEffect(() => {
		if (fieldInputType) {
			const newConditions = conditions.filter((condition) =>
				condition.allowedFieldTypes?.includes(fieldInputType)
			)
			setFilteredConditions(newConditions)
			if (inputRef.current) {
				inputRef.current?.onChange?.('')
			}
		}
	}, [conditions, fieldInputType])

	const onSubmit = (filters: FilterInput) => {
		try {
			const parsedFilter = FilterSchema.parse(filters)
			const filterWithModel: FilterInputWithModel = {
				...parsedFilter,
				model: fieldModel,
				dataType: fieldInputType
			}
			updateFiltersArray(filterWithModel, filterKey)
		} catch (error) {
			return
		}
	}

	return (
		<div className={className} data-testid={testId}>
			<Form
				onSubmit={onSubmit}
				render={({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<div className='grid grid-cols-8 gap-4 items-center pt-4'>
							<div className='flex flex-col gap-3 col-span-7 md:col-span-1'>
								{firstItem ? (
									<Text className='bg-gray-200 rounded m-auto px-6 py-2'>{t('where')}</Text>
								) : (
									<SelectInput
										name='filterType'
										options={filterTypes}
										components={{ Option }}
										onChange={handleFieldChange}
									/>
								)}
							</div>
							<div className='flex flex-col gap-3 col-span-7 md:col-span-3'>
								<SelectInput
									name='field'
									options={fields}
									components={{ Option }}
									onChange={handleFieldChange}
								/>
							</div>
							<div className='flex flex-col gap-3 col-span-7 md:col-span-2'>
								<SelectInput<OptionType> name='condition' options={filteredConditions} />
							</div>
							<div className='flex flex-col gap-3 col-span-7 md:col-span-2'>
								{fieldInputType === QueryInputType.select && value ? (
									<SelectInput
										name='value'
										options={fields.filter((field) => field.value === value)[0].items}
									/>
								) : (
									<Input name='value' type={fieldInputType} ref={inputRef} />
								)}
							</div>
						</div>
						<FormSpy
							onChange={(props) => {
								debounce(() => onSubmit(props.values as FilterInput), 500, 'filters')()
							}}
						/>
					</form>
				)}
			/>
		</div>
	)
}
