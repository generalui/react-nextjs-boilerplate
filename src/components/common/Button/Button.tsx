import cn from 'classnames'
import Link from 'next/link'
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

	return link ? (
		<Link
			href={href as string}
			target={target || '_blank'}
			onClick={onClick}
			className={className}
			ref={ref}
			id={id}
		>
			{children}
		</Link>
	) : (
		<button
			data-testid={testId}
			type={type}
			disabled={disabled}
			className={className}
			onClick={onClick}
			id={id}
		>
			{children}
		</button>
	)
})
