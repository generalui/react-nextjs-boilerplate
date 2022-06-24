import { StudyStatus } from '@prisma/client'
import { DropDownProps } from 'common/DropDown/DropDown.types'

export interface StudyStatusDropdownProps extends Omit<DropDownProps, 'children' | 'items'> {
	onChange: (status: StudyStatus) => void
	value: StudyStatus
}
