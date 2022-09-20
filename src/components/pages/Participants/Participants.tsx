/*!
 * Participants Page
 */
import { OptionType } from 'types/QueryBuilder'
import participants from 'utils/conditionsStructure'
import { useText } from 'hooks/useText'
import { PageWrapper } from 'partials/PageWrapper'
import { QueryBuilder } from 'partials/QueryBuilder'
import { ParticipantsProps } from './Participants.types'

export const Participants = function Participants({ testId = 'Participants' }: ParticipantsProps) {
	const { t } = useText('participants.conditions')

	const fields: OptionType[] = Object.entries(participants.conditions.fields).flatMap(
		([key, value]) => {
			const fieldOptions: OptionType[] = Object.entries(
				participants.conditions.fields[key as keyof typeof participants.conditions.fields].options
			).map(([key, value]) => {
				const { key: valueKey } = value
				return {
					label: t(valueKey),
					value: key,
					type: 'option'
				}
			})

			return [
				{
					label: t(value.title.key),
					value: key,
					type: 'mainField',
					isDisabled: true
				},
				...fieldOptions
			]
		}
	)

	const conditions: OptionType[] = Object.entries(participants.conditions.condition.options).map(
		([key, value]) => {
			return {
				label: t(value.label.key),
				value: key,
				inputType: t(value.inputType.key)
			}
		}
	)

	return (
		<PageWrapper title='Participants' testId={testId}>
			<QueryBuilder
				fields={fields}
				conditions={conditions}
				model='participant'
				summaryModel='study'
			/>
		</PageWrapper>
	)
}
