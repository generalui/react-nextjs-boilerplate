import cn from 'classnames'
import { PageHeaderProps } from './PageHeader.types'

export const PageHeader = ({ children, className, testId = 'PageHeader' }: PageHeaderProps) => {
	return (
		<div className={cn('mb-6', className)} data-testid={testId}>
			{children}
		</div>
	)
}
