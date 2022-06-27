import cn from 'classnames'
import { TextProps } from './Text.types'
import { textVariants } from './Text.variants'

/**
 * Text component.
 *
 * V stands for variant. Sorry, I'm lazy. :(
 */
export const Text = ({ children, className, href, testId = 'Text', v = 'default' }: TextProps) => {
	const Component = href ? 'a' : 'div'

	return (
		<Component className={cn(className, textVariants[v])} data-testid={testId} href={href}>
			{children}
		</Component>
	)
}
