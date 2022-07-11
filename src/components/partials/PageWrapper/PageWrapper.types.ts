import { CommonProps } from 'types/CommonProps'
import { NavBarProps } from 'partials/NavBar/NavBar.types'

export interface PageWrapperProps extends CommonProps, NavBarProps {
	title?: string
	fullWidth?: boolean
	showSidebar?: boolean
	hideSidebar?: boolean
}
