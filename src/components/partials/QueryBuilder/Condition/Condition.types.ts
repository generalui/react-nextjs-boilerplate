import { CommonProps } from 'types/CommonProps'
import { OptionType } from 'types/QueryBuilder'

export interface ConditionProps extends CommonProps {
	fields: OptionType[]
	conditions: OptionType[]
}
