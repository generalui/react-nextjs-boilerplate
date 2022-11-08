import { CommonProps } from 'types/CommonProps'
import { FilterInputWithModel, OptionType } from 'types/QueryBuilder'
import { ItemsSelect } from 'common/SelectInput/SelectInput.types'

export interface FilterProps extends CommonProps {
	fields: OptionType[]
	conditions: OptionType[]
	filterTypes: ItemsSelect
	updateFiltersArray: (filters: FilterInputWithModel, key: string) => void
	handleRemoveFilter: (key: string) => void
	filterKey: string
	firstItem?: boolean
}
