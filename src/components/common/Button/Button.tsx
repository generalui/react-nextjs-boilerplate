import cn from 'classnames'
import { ButtonProps } from './Button.types'

/**
 * Common button component
 *
 * @returns
 */

const STYLES = {
	default:
		'text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-800 flex items-center gap-2'
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
	onClick
}: ButtonProps) => {
	const noVariant = !primary || !secondary || !danger || !warn || !success

	return (
		<button
			data-testid={testId}
			type='button'
			className={cn(noVariant && STYLES.default, center && 'justify-center', className)}
			onClick={onClick}
		>
			{children}
		</button>
	)
}
