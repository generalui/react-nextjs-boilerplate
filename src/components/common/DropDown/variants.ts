import { buttonVariants } from '../Button/variants'

const defaultIcon = 'text-button-text-secondary'
const defaultMenu = 'left-1/2'

export const dropDownVariants = {
	default: {
		container: 'bg-white',
		button: 'py-3 px-4',
		icon: defaultIcon,
		menu: defaultMenu
	},
	secondary: {
		container: 'text-button-text-secondary bg-secondary hover:bg-secondary-hover',
		button: 'px-4 py-1',
		icon: defaultIcon,
		menu: defaultMenu
	},
	button: {
		container: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300',
		button: buttonVariants.sm,
		icon: 'text-button-text-secondary hidden',
		menu: 'left-[68px]'
	},
	sidebar: {
		container: 'w-full hover:bg-gray-100',
		button: 'h-8',
		icon: defaultIcon,
		menu: defaultMenu
	}
}
