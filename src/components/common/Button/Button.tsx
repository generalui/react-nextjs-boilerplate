import cn from 'classnames'
import { ButtonProps } from './Button.types'

/**
 * Common button component
 *
 * The Flowbite React Button component does not accept a className prop
 * https://flowbite-react.com/buttons
 *
 * This means we can not make full width buttons with Flowbite React
 * For this reason we will be creating our own button component
 *
 * @returns
 */

const STYLES = {
	default:
		'text-white bg-[#0093D8] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-[#0093D8] dark:hover:bg-[#0093D8] focus:outline-none dark:focus:ring-blue-800'
}

export const Button = ({
	testId = 'Button',
	children,
	className,
	primary,
	secondary,
	danger,
	warn,
	success,
	center,
	onClick,
	type = 'button'
}: ButtonProps) => {
	const noVariant = !primary || !secondary || !danger || !warn || !success

	return (
		<button
			data-testid={testId}
			type={type}
			className={cn(
				noVariant && STYLES.default,
				center && 'flex justify-center items-center',
				className
			)}
			onClick={onClick}
		>
			{children}
		</button>
	)
}
