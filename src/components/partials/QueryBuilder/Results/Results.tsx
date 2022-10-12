import { List } from 'partials/List'
import { Column, ListData } from 'partials/List/List.types'
import { Card } from 'common/Card'
import { ResultsComponent } from './Results.types'

export const Results: ResultsComponent = ({
	results = [],
	className,
	testId = 'Results',
	title,
	columns
}) => {
	return (
		<div className={className} data-testid={testId}>
			<Card iconProps={{ icon: 'UserIcon', wrapperClass: 'bg-green-300' }} title={title}>
				<List
					columns={columns as unknown as Column<ListData>[]}
					data={results}
					indexKey='id'
					concise
				/>
			</Card>
		</div>
	)
}
