import cn from 'classnames'
import { buttonVariants, disabledVariants } from 'common/Button/variants'
import { ButtonProps } from './Button.types'

/**
 * Common button component
 *
 * @returns
 */

export const Button = ({
	testId = 'Button',
	children,
	className,
	center,
	onClick,
	type = 'button',
	disabled,
	v = 'default'
}: ButtonProps) => (
	<button
		data-testid={testId}
		type={type}
		disabled={disabled}
		className={cn(
			className,
			buttonVariants[v],
			disabled && disabledVariants[`${v}Disabled`],
			center && 'flex justify-center items-center'
		)}
		onClick={onClick}
	>
		{children}
	</button>
)
