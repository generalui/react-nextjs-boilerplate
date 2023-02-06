import { DocumentGridProps } from './DocumentGrid.types'

export const DocumentGrid = ({ children, className, testId = 'DocumentGrid' }: DocumentGridProps) => {
	return (
		<div className={className} data-testid={testId}>
			{children}
		</div>
	)
}
