import cn from 'classnames'
import { PageContainerProps } from './PageContainer.types'

export const PageContainer = ({
	children,
	className,
	testId = 'PageContainer'
}: PageContainerProps) => {
	return (
		<div className={cn('flex flex-col space-y-12', className)} data-testid={testId}>
			{children}
		</div>
	)
}
