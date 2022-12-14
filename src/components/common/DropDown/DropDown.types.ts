import { CommonProps } from 'types/CommonProps'
import { DropDownItemProps } from 'common/DropDown/DropDownItem/DropDownItem.types'
import { dropDownVariants } from 'common/DropDown/variants'

export interface DropDownProps extends CommonProps {
	children: React.ReactNode
	items: DropDownItemProps[]
	v?: keyof typeof dropDownVariants
	dropDownItemOnClick?: () => void
}
