import cn from 'classnames'
import React from 'react'
import { TextProps } from './Text.types'
import { textVariants } from './Text.variants'

/**
 * Text component.
 *
 * V stands for variant. Sorry, I'm lazy. :(
 */
export const Text = React.forwardRef<HTMLAnchorElement, TextProps>(function Text(
	{ children, className, href, onClick, testId = 'Text', v = 'default' }: TextProps,
	ref
) {
	const Component = href ? 'a' : 'div'

	return (
		<Component
			className={cn(className, textVariants[v])}
			data-testid={testId}
			href={href}
			// @ts-expect-error Not sure how to type this ref since the base component can change
			ref={Component === 'a' ? ref : null}
			onClick={onClick}
		>
			{children}
		</Component>
	)
})
