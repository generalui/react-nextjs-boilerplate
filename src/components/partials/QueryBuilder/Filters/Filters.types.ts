import { CommonProps } from 'types/CommonProps'
import { OptionType } from 'partials/QueryBuilder/QueryBuilder.types'

export interface FiltersProps extends CommonProps {
	fields: OptionType[]
	conditions: OptionType[]
}
