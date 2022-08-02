import { buttonVariants } from '../Button/variants'

export const dropDownVariants = {
	default: { container: 'bg-white', button: 'py-3 px-4' },
	secondary: { container: 'text-blue-600 bg-blue-100 hover:bg-blue-200', button: 'px-4 py-1' },
	button: {
		container: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300',
		button: buttonVariants.sm
	}
}
