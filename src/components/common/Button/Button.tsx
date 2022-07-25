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
	v = 'default',
	link,
	target,
	href
}: ButtonProps) => {
	className = cn(
		buttonVariants[v],
		disabled && disabledVariants[`${v}Disabled`],
		center && 'flex justify-center items-center',
		className
	)

	const props = {
		['data-testid']: testId,
		type: link ? undefined : type,
		disabled,
		className,
		onClick,
		target: link ? target || '_blank' : undefined,
		href: link ? href : undefined
	}

	return link ? <a {...props}>{children}</a> : <button {...props}>{children}</button>
}
