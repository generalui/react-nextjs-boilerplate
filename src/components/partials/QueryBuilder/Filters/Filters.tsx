import { FiltersProps } from './Filters.types'

export const Filters = ({ children, className, testId = 'Filters' }: FiltersProps) => {
	return (
		<div className={className} data-testid={testId}>
			{children}
		</div>
	)
}
