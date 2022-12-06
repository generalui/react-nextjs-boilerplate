/*!
 * AddSurvey Page
 */
import { groupBy, isEmpty, omitBy } from 'lodash'
import { useEffect, useState } from 'react'
import { UploadCSVInput } from 'types/CSV'
import { useParseCSV } from 'hooks/useParseCSV'
import { useText } from 'hooks/useText'
import { SurveyResponse, SurveyResponses } from 'pages/AddSurvey'
import { UploadCSV } from 'partials/AddParticipantsCSVForm/steps/UploadCSV'
import { PageWrapper } from 'partials/PageWrapper'
import { Breadcrumbs } from 'common/Breadcrumbs'
import { Card } from 'common/Card'
import { AddSurveyProps } from './AddSurvey.types'

export const AddSurvey = function AddSurvey({ testId = 'AddSurvey' }: AddSurveyProps) {
	const { parse, parsedCSV } = useParseCSV()
	const [participantResponses, setParticipantResponses] = useState<SurveyResponses>([])
	const [surveys, setSurveys] = useState<string[]>([])
	const { t } = useText('studies.addSurvey')

	useEffect(() => {
		if (parsedCSV) {
			const surveyResponses = parsedCSV.reduce((responses: SurveyResponse, row, i) => {
				const { participant_id, redcap_event_name } = row
				let participantSurveyResponses: SurveyResponse = []
				let currentResponse: Record<string, unknown> = {}

				Object.entries(row).map(([key, value]) => {
					if (key.includes('timestamp')) {
						const survey_id = key.split('_timestamp')[0]
						if (value) {
							participantSurveyResponses.push(currentResponse)
							currentResponse = {
								survey_id,
								timestamp: value,
								participant_id,
								redcap_event_name
							}
						}
						if (i === 0) setSurveys((prev) => [...prev, survey_id])
					} else {
						if (value && key !== 'participant_id' && key !== 'redcap_event_name')
							if (currentResponse['survey_responses']) {
								currentResponse['survey_responses'] = {
									...currentResponse['survey_responses'],
									[key]: value
								}
							}
					}
				})
				participantSurveyResponses = [...participantSurveyResponses, currentResponse]
				return [...responses, ...participantSurveyResponses]
			}, [])

			const responsesByParticipant: SurveyResponses = Object.values(
				groupBy(omitBy(surveyResponses, isEmpty), 'participant_id')
			).map((responseByParticipant) => responseByParticipant)
			console.log('🚀 ~ responsesByParticipant', responsesByParticipant)

			setParticipantResponses(responsesByParticipant)
		}
	}, [parsedCSV])

	const handleUploadCSV = (values: UploadCSVInput) => {
		parse(values.csvFile[0])
	}

	return (
		<PageWrapper title={t('title')} testId={testId}>
			<Breadcrumbs className='col-span-8' />

			<Card>
				<UploadCSV onSubmit={handleUploadCSV} />

				{participantResponses.length > 0 && (
					<div className='pt-6'>
						<b>{t('summary')}</b>
						<div>
							{t('participantsAmount')}&nbsp;
							{participantResponses.length}
						</div>
						<div>
							{t('surveysAmount')}&nbsp;
							{surveys.length}
						</div>
					</div>
				)}
			</Card>
		</PageWrapper>
	)
}
