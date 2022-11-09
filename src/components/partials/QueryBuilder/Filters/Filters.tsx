import { useEffect, useState } from 'react'
import { FilterInputWithModel, FilterListItem } from 'types/QueryBuilder'
import { v4 as uuidv4 } from 'uuid'
import { useText } from 'hooks/useText'
import { Filter } from 'partials/QueryBuilder/Filter/Filter'
import { FiltersHeader } from 'partials/QueryBuilder/FiltersHeader'
import { Button } from 'common/Button'
import { Card } from 'common/Card'
import { Icon } from 'common/Icon'
import { FiltersProps } from './Filters.types'

export const Filters = ({
	className,
	fields,
	conditions,
	filterTypes,
	onChange,
	testId = 'Filters'
}: FiltersProps) => {
	const { t } = useText('queryBuilder.filters')
	const [filtersArray, setFiltersArray] = useState<FilterListItem[]>([])

	const updateResults = (filters: FilterListItem[]) => {
		setFiltersArray(filters)
		onChange(getFiltersArray(filters))
	}

	const getFiltersArray = (filters: FilterListItem[]) => {
		return filters
			.filter((filter) => !!filter?.filter)
			.map((filter) => ({ ...filter.filter } as FilterInputWithModel))
	}

	const updateFiltersArray = (filter: FilterInputWithModel, key: string) => {
		const filtersArrayCopy = [...filtersArray]
		const index = filtersArrayCopy.findIndex((item) => item.key === key)
		filtersArrayCopy[index].filter = filter

		updateResults(filtersArrayCopy)
	}

	const handleAddRow = (filters: FilterListItem[]) => {
		setFiltersArray([...filters, { key: uuidv4() }])
	}

	const handleRemoveFilter = (key: string) => {
		const newFilterArray = filtersArray.filter((f) => f.key !== key)

		updateResults(newFilterArray)
	}

	const handleClearFilter = () => {
		const newFilterArray: FilterListItem[] = []
		updateResults(newFilterArray)

		handleAddRow(newFilterArray)
	}

	useEffect(() => {
		handleAddRow(filtersArray)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className={className} data-testid={testId}>
			<Card
				iconProps={{ icon: 'DocumentChartBarIcon' }}
				title={t('title')}
				headerClassName='pb-4 border-b mb-0'
			>
				<div className='flex flex-col gap-4 p-4'>
					<FiltersHeader />
					{filtersArray.map((filter, i) => {
						return (
							<Filter
								key={filter.key}
								filterKey={filter.key}
								fields={fields}
								conditions={conditions}
								filterTypes={filterTypes}
								updateFiltersArray={updateFiltersArray}
								firstItem={i === 0}
								handleRemoveFilter={handleRemoveFilter}
							/>
						)
					})}
					<div className='flex flex-row justify-between w-100'>
						<Button onClick={() => handleAddRow(filtersArray)}>
							<Icon icon='PlusSmallIcon' />
							{t('add')}
						</Button>

						<Button v='secondaryOutlined' onClick={handleClearFilter}>
							<Icon icon='XMarkIcon' outlined />
							{t('clear')}
						</Button>
					</div>
				</div>
			</Card>
		</div>
	)
}
