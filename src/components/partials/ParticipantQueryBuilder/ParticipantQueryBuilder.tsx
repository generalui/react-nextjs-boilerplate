import { Participant } from '@prisma/client'
import { useEffect, useState } from 'react'
import { ApiParticipantQueryResults } from 'types/Participants'
import { Filter, OptionType, QueryBuilderModel } from 'types/QueryBuilder'
import { formatDisplayDate } from 'utils/client/date'
import { useParticipantQuery } from 'hooks/api/queryBuilder/useParticipantQuery'
import { useText } from 'hooks/useText'
import { AggregatedDataCardProps } from 'partials/AggregatedDataCard/AggregatedDataCard.types'
import { Column } from 'partials/List/List.types'
import { QueryBuilder } from 'partials/QueryBuilder'
import { ParticipantQueryBuilderProps } from './ParticipantQueryBuilder.types'
import { participantQueryFields } from './participantQueryFields'
import { summaryCards } from './summaryCards'

export const ParticipantQueryBuilder = ({
	className,
	testId = 'ParticipantQueryBuilder'
}: ParticipantQueryBuilderProps) => {
	const { t } = useText('participants.conditions')
	const [filters, setFilters] = useState<Filter[]>()
	const { participants } = useParticipantQuery(filters)
	const { t: queryBuilderText } = useText('queryBuilder')
	const [dataSummary, setDataSummary] = useState<AggregatedDataCardProps[]>(summaryCards)

	useEffect(() => {
		setDataSummary(
			summaryCards.map((summaryElem: AggregatedDataCardProps) => ({
				...summaryElem,
				title: queryBuilderText(summaryElem.title as string),
				value: summaryElem.key === 'participants' ? participants?.modelCount ?? 0 : 0
			}))
		)
	}, [participants?.modelCount, queryBuilderText])

	const handleFilterChange = (change: Filter[]) => {
		setFilters(change)
	}

	const fields: OptionType[] = Object.entries(participantQueryFields).flatMap(([key, value]) => {
		const { model } = value

		const fieldOptions: OptionType[] = Object.entries(
			participantQueryFields[key as keyof typeof participantQueryFields].options
		).map(([optionKey, optionValue]) => {
			const { key } = optionValue

			return {
				label: t(key),
				value: optionKey,
				type: 'option',
				inputType: t(key).toLowerCase().includes('date') ? 'date' : 'text',
				model: model as QueryBuilderModel
			}
		})

		return [
			{
				label: t(value.title.key),
				value: key,
				type: 'header',
				isDisabled: true,
				model: model as QueryBuilderModel
			},
			...fieldOptions
		]
	})

	const columns: Column<Participant>[] = [
		{
			key: 'id',
			title: 'Participant ID',
			width: 5
		},
		{
			// @ts-expect-error TODO: Fix this type
			key: '_count.studies',
			title: 'Studies',
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
			<QueryBuilder<Participant, ApiParticipantQueryResults>
				fields={fields}
				onFilterChange={handleFilterChange}
				results={participants}
				dataSummaryCards={dataSummary}
				columns={columns}
				title={'Participants'}
			/>
		</div>
	)
}
