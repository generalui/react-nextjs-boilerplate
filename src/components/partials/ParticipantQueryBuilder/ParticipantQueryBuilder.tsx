import cn from 'classnames'
import { useEffect, useState } from 'react'
import { ConsentState } from 'types/Consent'
import { ParticipantQueryResults, SingleParticipantQueryResult } from 'types/Participants'
import { Filter, OptionType, QueryBuilderModel } from 'types/QueryBuilder'
import { formatDisplayDate } from 'utils/client/date'
import { getParticipantConsentFullness } from 'utils/client/getConsentFullness'
import { useParticipantQuery } from 'hooks/api/queryBuilder/useParticipantQuery'
import { useText } from 'hooks/useText'
import { AggregatedDataCardProps } from 'partials/AggregatedDataCard/AggregatedDataCard.types'
import { Column } from 'partials/List/List.types'
import { QueryBuilder } from 'partials/QueryBuilder'
import { ItemsSelect } from 'common/SelectInput/SelectInput.types'
import { ParticipantQueryBuilderProps } from './ParticipantQueryBuilder.types'
import { participantQueryFields } from './participantQueryFields'
import { summaryCards } from './summaryCards'

export const ParticipantQueryBuilder = ({
	className,
	testId = 'ParticipantQueryBuilder'
}: ParticipantQueryBuilderProps) => {
	const { t } = useText('participants.conditions')
	const { t: consentText } = useText('participant.todo.consent.consentState')
	const [filters, setFilters] = useState<Filter[]>()
	const { participants } = useParticipantQuery(filters)
	const { t: queryBuilderText } = useText('queryBuilder')
	const [dataSummary, setDataSummary] = useState<AggregatedDataCardProps[]>(summaryCards)

	useEffect(() => {
		setDataSummary(
			summaryCards.map((summaryElem: AggregatedDataCardProps) => {
				const value =
					summaryElem.key === 'participants'
						? participants?.modelCount ?? 0
						: summaryElem.key === 'todos'
						? participants?.todoCount ?? 0
						: 0

				return {
					...summaryElem,
					title: queryBuilderText(summaryElem.title as string),
					value
				}
			})
		)
	}, [participants?.modelCount, participants?.todoCount, queryBuilderText])

	const handleFilterChange = (change: Filter[]) => {
		setFilters(change)
	}

	const fields: OptionType[] = Object.entries(participantQueryFields).flatMap(([key, value]) => {
		const { model } = value

		const fieldOptions: OptionType[] = Object.entries(
			participantQueryFields[key as keyof typeof participantQueryFields].options
		).map(([optionKey, optionValue]) => {
			const { label, inputType, items: optionItems } = optionValue
			let items: ItemsSelect | undefined = undefined

			if (optionItems) {
				items = []
				Object.entries(optionItems).map(([itemKey, itemValue]) => {
					const { label } = itemValue
					items?.push({ label: t(label), value: itemKey })
				})
			}

			return {
				label: t(label),
				value: optionKey,
				type: 'option',
				inputType,
				model: model as QueryBuilderModel,
				items
			}
		})

		return [
			{
				label: t(value.title.label),
				value: key,
				type: 'header',
				isDisabled: true,
				model: model as QueryBuilderModel
			},
			...fieldOptions
		]
	})

	const columns: Column<SingleParticipantQueryResult>[] = [
		{
			key: 'id',
			title: 'Participant ID',
			width: 5
		},
		{
			key: 'todos',
			title: 'Todos',
			width: 2,
			transformFunction: (_value, data) => {
				return (
					<div className='p-4 bg-gray-100 flex justify-center rounded-md w-fit'>
						{data.todos?.length}
					</div>
				)
			}
		},
		{
			key: 'todos',
			title: 'Consents',
			width: 2,
			transformFunction: (_value, data) => {
				const participantConsentState = getParticipantConsentFullness(data)

				return (
					<div
						className={cn(
							'p-4 flex justify-center rounded-md w-fit',
							participantConsentState === ConsentState.full
								? 'bg-green-100'
								: participantConsentState === ConsentState.partial
								? 'bg-yellow-100'
								: 'bg-red-100'
						)}
					>
						{consentText(participantConsentState)}
					</div>
				)
			}
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
			<QueryBuilder<SingleParticipantQueryResult, ParticipantQueryResults>
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
