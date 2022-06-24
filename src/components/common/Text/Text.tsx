import cn from 'classnames'
import { TextProps } from './Text.types'
import { textVariants } from './Text.variants'

/**
 * Text component.
 *
 * V stands for variant. Sorry, I'm lazy. :(
 */
export const Text = ({ children, className, testId = 'Text', v = 'default' }: TextProps) => {
	return (
		<div className={cn(className, textVariants[v])} data-testid={testId}>
			{children}
		</div>
	)
}
