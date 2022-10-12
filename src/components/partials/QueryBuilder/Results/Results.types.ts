import { ReactElement } from 'react'
import { CommonProps } from 'types/CommonProps'
import { Column, ListData } from 'partials/List/List.types'

export type ResultsComponent = <DataType = Record<string, unknown>>(
	props: ResultsProps<DataType>
) => ReactElement

export interface ResultsProps<DataType = Record<string, unknown>, ResultsType = ListData>
	extends CommonProps {
	results?: ResultsType[]
	columns: Column<DataType>[]
	title: string
}
