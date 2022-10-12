import { ReactElement } from 'react'
import { CommonProps } from 'types/CommonProps'
import { Filter, OptionType } from 'types/QueryBuilder'
import { AggregatedDataCardProps } from 'partials/AggregatedDataCard/AggregatedDataCard.types'
import { Column, ListData } from 'partials/List/List.types'

export type QueryBuilderComponent = <
	ModelType extends Record<string, unknown>,
	ResultsType extends { list: ListData[] }
>(
	props: QueryBuilderProps<ModelType, ResultsType>
) => ReactElement

export interface QueryBuilderProps<
	ModelType extends Record<string, unknown>,
	ResultsType extends { list: ListData[] }
> extends CommonProps {
	fields: OptionType[]
	dataSummaryCards: AggregatedDataCardProps[]
	title: string
	columns: Column<ModelType>[]
	results?: ResultsType
	onFilterChange?: (filter: Filter[]) => void
}
