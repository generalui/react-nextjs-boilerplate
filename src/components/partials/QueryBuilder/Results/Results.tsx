import { ResultsProps } from './Results.types'

export const Results = ({ children, className, testId = 'Results' }: ResultsProps) => {
	return (
		<div className={className} data-testid={testId}>
			{children}
		</div>
	)
}
