import { ActionMeta, GroupBase, OnChangeValue, OptionsOrGroups, StylesConfig } from 'react-select'
import { SelectComponents } from 'react-select/dist/declarations/src/components'
import { CommonProps } from 'types/CommonProps'

export interface SelectProps<T> extends CommonProps {
	isMulti?: true
	options?: OptionsOrGroups<T, GroupBase<T>>
	components?: Partial<SelectComponents<T, boolean, GroupBase<T>>>
	styles?: StylesConfig<T, boolean, GroupBase<T>>
	name?: string
	value?: string
	onChange?: (newValue: OnChangeValue<T, boolean>, actionMeta: ActionMeta<T>) => void
}
