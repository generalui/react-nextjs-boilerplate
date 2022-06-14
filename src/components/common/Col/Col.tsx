import cn from 'classnames'
import { ColProps } from './Col.types'

/**
 * Minimal component that defaults a tailwind column to sizing auto
 * https://tailwindcss.com/docs/grid-column
 *
 */
export const Col = ({ children, className, span, start, end, testId = 'Col' }: ColProps) => {
	return (
		<div
			className={cn(
				false && 'col-auto',
				span && `col-span-${span}`,
				start && `col-start-${start}`,
				end && `col-end-${end}`,
				className
			)}
			data-testid={testId}
		>
			{children}
		</div>
	)
}
