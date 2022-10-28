import { useState } from 'react'
import { FormSpy } from 'react-final-form'
import { FilterInput, QueryBuilderModel } from 'types/QueryBuilder'
import { debounce } from 'utils/debounce'
import { useText } from 'hooks/useText'
import { Form } from 'partials/Form'
import { Condition } from 'partials/QueryBuilder/Condition'
import { Card } from 'common/Card'
import { FiltersProps } from './Filters.types'

export const Filters = ({
	className,
	fields,
	conditions,
	filterTypes,
	onChange,
	initialValues,
	testId = 'Filters'
}: FiltersProps) => {
	const { t } = useText('queryBuilder.filters')
	const [fieldDataType, setFieldDataType] = useState<string | undefined>()
	const [fieldModel, setFieldModel] = useState<QueryBuilderModel | undefined>()

	const onSubmit = (filters: FilterInput) => {
		try {
			// const parsedFilters = FilterSchema.parse(filters)
			onChange(filters, fieldModel, fieldDataType)
		} catch (error) {
			return
		}
	}

	return (
		<div className={className} data-testid={testId}>
			<Card
				iconProps={{ icon: 'DocumentChartBarIcon' }}
				title={t('title')}
				headerClassName='pb-4 border-b mb-0'
			>
				<Form
					onSubmit={onSubmit}
					initialValues={initialValues}
					render={({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<Condition
								fields={fields}
								conditions={conditions}
								filterTypes={filterTypes}
								onFieldTypeChange={setFieldDataType}
								onModelChange={setFieldModel}
							/>
							<FormSpy
								onChange={(props) => {
									debounce(() => onSubmit(props.values as FilterInput), 500, 'filters')()
								}}
							/>
						</form>
					)}
				/>
			</Card>
		</div>
	)
}
