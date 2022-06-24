import { StudyStatus } from '@prisma/client'
import { DropDownProps } from 'components/common/DropDown/DropDown.types'

export interface StudyStatusDropdownProps extends Omit<DropDownProps, 'children' | 'items'> {
	onChange: (status: StudyStatus) => void
	value: StudyStatus
}
