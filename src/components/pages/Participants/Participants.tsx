/*!
 * Participants Page
 */
import { OptionType, QueryBuilderModel } from 'types/QueryBuilder'
import { ConditionInput } from 'types/QueryBuilder'
import participants from 'utils/conditionsStructure'
import { useText } from 'hooks/useText'
import { PageWrapper } from 'partials/PageWrapper'
import { QueryBuilder } from 'partials/QueryBuilder'
import { ParticipantsProps } from './Participants.types'

const transformField = (field: ConditionInput, study?: boolean) => {
	// if study
	if (study)
		return {
			study: {
				some: {
					[field.field.value]: {
						[field.condition.value]: field.value
					}
				}
			}
		}
	else return field
}

export const Participants = function Participants({ testId = 'Participants' }: ParticipantsProps) {
	const { t } = useText('participants.conditions')

	const fields: OptionType[] = Object.entries(participants.conditions.fields).flatMap(
		([key, value]) => {
			const { model } = value
			const fieldOptions: OptionType[] = Object.entries(
				participants.conditions.fields[key as keyof typeof participants.conditions.fields].options
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
		}
	)

	const conditions: OptionType[] = Object.entries(participants.conditions.condition.options).map(
		([key, value]) => {
			return {
				label: t(value.label.key),
				value: key,
				allowedFieldTypes: value.allowedFieldTypes
			}
		}
	)

	return (
		<PageWrapper title='Participants' testId={testId}>
			<QueryBuilder
				transformField={transformField}
				fields={fields}
				conditions={conditions}
				model='participant'
				summaryModel='study'
			/>
		</PageWrapper>
	)
}
