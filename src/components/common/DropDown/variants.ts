import { buttonVariants } from '../Button/variants'

export const dropDownVariants = {
	default: {
		container: 'bg-white',
		button: 'py-3 px-4',
		icon: 'text-button-text-secondary'
	},
	secondary: {
		container: 'text-button-text-secondary bg-secondary hover:bg-secondary-hover',
		button: 'px-4 py-1',
		icon: 'text-button-text-secondary'
	},
	button: {
		container: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300',
		button: buttonVariants.sm,
		icon: 'text-button-text-secondary'
	}
}
