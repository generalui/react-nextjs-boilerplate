import { ReactNode } from 'react'
import {
	ActionMeta,
	GroupBase,
	OnChangeValue,
	OptionsOrGroups,
	PropsValue,
	StylesConfig
} from 'react-select'
import { SelectComponents } from 'react-select/dist/declarations/src/components'
import { CommonProps } from 'types/CommonProps'

export interface SelectProps<T = unknown> extends CommonProps {
	isMulti?: boolean
	isClearable?: boolean
	options?: OptionsOrGroups<T, GroupBase<T>>
	components?: Partial<SelectComponents<T, boolean, GroupBase<T>>>
	styles?: StylesConfig<T, boolean, GroupBase<T>>
	name?: string
	value?: PropsValue<T>
	placeholder?: ReactNode
	onChange?: (newValue: OnChangeValue<T, boolean>, actionMeta: ActionMeta<T>) => void
}

export type SelectComponent = <T>(props: SelectProps<T>) => JSX.Element
