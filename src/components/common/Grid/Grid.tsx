import cn from 'classnames'
import { GridProps } from './Grid.types'

export const Grid = ({
	children,
	className,
	cols,
	rows,
	flow,
	center,
	gap,
	testId = 'Grid'
}: GridProps) => {
	return (
		<div
			className={cn(
				'grid',
				cols && `grid-cols-${cols}`,
				rows && `grid-row-${rows}`,
				flow && `grid-flow-${flow}`,
				gap && `grid-gap-${gap}`,
				center && `items-center`,
				className
			)}
			data-testid={testId}
		>
			{children}
		</div>
	)
}
