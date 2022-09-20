import cn from 'classnames'
import { forwardRef } from 'react'
import { buttonVariants, disabledVariants } from 'common/Button/variants'
import { ButtonProps } from './Button.types'

/**
 * Common button component
 *
 * Forward ref needed to work with next/Link component
 *
 * @returns ReactNode
 */
export const Button = forwardRef<HTMLAnchorElement, ButtonProps>(function Button(
	{
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
		href,
		id
	}: ButtonProps,
	ref
) {
	className = cn(
		disabled ? disabledVariants[`${v}Disabled`] : buttonVariants[v],
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

	return link ? (
		<a {...props} ref={ref} id={id}>
			{children}
		</a>
	) : (
		<button {...props} id={id}>
			{children}
		</button>
	)
})
