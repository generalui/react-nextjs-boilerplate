import { TodoStatus } from '@prisma/client'
import { DropDownProps } from 'common/DropDown/DropDown.types'

export interface TodoStatusDropdownProps extends Omit<DropDownProps, 'children' | 'items'> {
	onChange: (status: TodoStatus) => void
	value: TodoStatus
}
