import { ChangeEvent } from 'react'
import { GroupBase, OptionsOrGroups } from 'react-select'
import { CommonProps } from 'types/CommonProps'
import { OnChangeValue, selectOptionsType } from 'types/index'

export interface InputProps extends CommonProps {
	onChange?: (value: OnChangeValue, previousValue: OnChangeValue) => void
	type?: string
	placeholder?: string
	name: string
	rows?: number
	isMulti?: true
	selectOptions?: OptionsOrGroups<selectOptionsType, GroupBase<selectOptionsType>>
}

export interface InputPropsV1 extends CommonProps {
	value?: string | number | readonly string[] | undefined
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
	type?: string
	placeholder?: string
}
