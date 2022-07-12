import { CommonProps } from 'types/CommonProps'

export interface NavBarProps extends CommonProps {
	title?: string
	hideTitle?: boolean
	showAuth?: boolean
	hideAuth?: boolean
	isMenuOpen?: boolean
	handleMenuToggle?: () => void
}
