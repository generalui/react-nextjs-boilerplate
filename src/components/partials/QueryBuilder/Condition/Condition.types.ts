import { CommonProps } from 'types/CommonProps'
import { OptionType } from 'partials/QueryBuilder/QueryBuilder.types'

export interface ConditionProps extends CommonProps {
	fields: OptionType[]
	conditions: OptionType[]
}
