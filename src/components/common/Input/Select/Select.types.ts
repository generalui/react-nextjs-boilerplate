import { GroupBase, OptionsOrGroups } from 'react-select'
import { CommonProps } from 'types/CommonProps'
import { selectOptionsType } from 'types/index'

export interface SelectProps extends CommonProps {
	props: any
	isMulti?: true
	selectOptions?: OptionsOrGroups<selectOptionsType, GroupBase<selectOptionsType>>
}
