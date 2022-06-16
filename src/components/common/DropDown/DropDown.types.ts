import { CommonProps } from 'types/CommonProps'
import { DropDownItemProps } from 'components/common/DropDown/DropDownItem/DropDownItem.types'
import { dropDownVariants } from 'components/common/DropDown/variants'

export interface DropDownProps extends CommonProps {
	children: React.ReactNode
	items: DropDownItemProps[]
	v?: keyof typeof dropDownVariants
}
