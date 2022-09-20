import { CommonProps } from 'types/CommonProps'

export type OptionType = {
	label: string
	value: string
	type?: 'option' | 'mainField'
	isDisabled?: boolean
	inputType?: string
}
export interface QueryBuilderProps extends CommonProps {
	fields: OptionType[]
	conditions: OptionType[]
}
