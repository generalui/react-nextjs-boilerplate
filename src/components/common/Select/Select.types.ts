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

export interface SelectProps<T> extends CommonProps {
	isMulti?: true
	options?: OptionsOrGroups<T, GroupBase<T>>
	components?: Partial<SelectComponents<T, boolean, GroupBase<T>>>
	styles?: StylesConfig<T, boolean, GroupBase<T>>
	name?: string
	value?: PropsValue<T>
	isClearable?: true
	placeholder?: string
	onChange?: (newValue: OnChangeValue<T, boolean>, actionMeta: ActionMeta<T>) => void
}

export type SelectComponent = <T>(props: SelectProps<T>) => JSX.Element
