import { Participant } from 'types/StudyParticipants'
import { formatDisplayDate } from 'utils/client/date'
import { capitalizeFirstLetter } from 'utils/client/text'
import { useText } from 'hooks/useText'
import { List } from 'partials/List'
import { Column } from 'partials/List/List.types'
import { Card } from 'common/Card'
import { ResultsProps } from './Results.types'

export const Results = ({
	results,
	model,
	summaryModel,
	className,
	testId = 'Results'
}: ResultsProps) => {
	const { t } = useText('common.queryBuilder')

	const columns: Column<Participant>[] = [
		{
			key: 'id',
			title: 'Participant ID',
			width: 5
		},
		{
			// @ts-expect-error TODO: Fix this type
			key: '_count.studies',
			title: capitalizeFirstLetter(summaryModel),
			width: 2,
			className: 'p-4 bg-gray-100 flex justify-center rounded-md w-fit'
		},
		{
			// @ts-expect-error TODO: Fix this type
			key: 'consents',
			title: 'Consents',
			width: 2,
			transformFunction: () => (
				<div className='bg-green-100 p-4 flex justify-center rounded-md w-fit'>{'Full'}</div>
			)
		},
		{
			key: 'insertedAt',
			title: 'Added',
			width: 2,
			// @ts-expect-error TODO: Fix this type
			transformFunction: (value: Date) => <>{formatDisplayDate(value)}</>
		}
	]

	return (
		<div className={className} data-testid={testId}>
			<Card
				iconProps={{ icon: 'UserIcon', wrapperClass: 'bg-green-300' }}
				title={t(`models.${model}.plural`)}
			>
				<List columns={columns} data={results || []} indexKey='id' concise />
			</Card>
		</div>
	)
}
