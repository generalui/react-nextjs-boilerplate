/*!
 * AddSurvey Page
 */
import { useEffect, useState } from 'react'
import { UploadCSVInput } from 'types/CSV'
import { useParseCSV } from 'hooks/useParseCSV'
import { useText } from 'hooks/useText'
import { SurveyResponse, SurveyResponses } from 'pages/AddSurvey'
import { UploadCSV } from 'partials/AddParticipantsCSVForm/steps/UploadCSV'
import { PageWrapper } from 'partials/PageWrapper'
import { Card } from 'common/Card'
import { AddSurveyProps } from './AddSurvey.types'

export const AddSurvey = function AddSurvey({ testId = 'AddSurvey' }: AddSurveyProps) {
	const { parse, parsedCSV } = useParseCSV()
	const [participantResponses, setParticipantResponses] = useState<SurveyResponses>([])
	const [surveyNames, setSurveyNames] = useState<string[]>([])
	const { t } = useText('studies.addSurvey')

	useEffect(() => {
		if (parsedCSV) {
			const ResponsesBySurvey = parsedCSV.reduce((acc: SurveyResponses, response, i) => {
				const participantSurveyResponses: SurveyResponse = []
				let currentResponse: Record<string, unknown> = {}
				const lastKey = Object.keys(response)[Object.keys(response).length - 1]
				Object.entries(response).map(([key, value]) => {
					if (key.includes('timestamp')) {
						const surveyName = key.split('_timestamp')[0]
						if (value) {
							participantSurveyResponses.push(currentResponse)
							currentResponse = {
								surveyName,
								timestamp: value
							}
						}
						if (i === 0) setSurveyNames((prev) => [...prev, surveyName])
					} else {
						if (value) currentResponse[key] = value
					}
					if (key === lastKey) {
						participantSurveyResponses.push(currentResponse)
					}
				})
				acc.push(participantSurveyResponses)
				return acc
			}, [])
			console.log('🚀 ~ participantSurveyResponses', ResponsesBySurvey)
			setParticipantResponses(ResponsesBySurvey)
		}
	}, [parsedCSV])

	const handleUploadCSV = (values: UploadCSVInput) => {
		parse(values.csvFile[0])
	}

	return (
		<PageWrapper title={t('title')} testId={testId}>
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
							{surveyNames.length}
						</div>
					</div>
				)}
			</Card>
		</PageWrapper>
	)
}
