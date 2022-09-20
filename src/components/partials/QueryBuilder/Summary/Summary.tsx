import { SummaryProps } from './Summary.types'

export const Summary = ({ children, className, testId = 'Summary' }: SummaryProps) => {
	return (
		<div className={className} data-testid={testId}>
			{children}
		</div>
	)
}
