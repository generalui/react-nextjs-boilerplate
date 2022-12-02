/*!
 * AddSurvey Page
 */
import { useEffect, useState } from 'react'
import { UploadCSVInput } from 'types/CSV'
import { useParseCSV } from 'hooks/useParseCSV'
import { SurveyResponses } from 'pages/AddSurvey'
import { UploadCSV } from 'partials/AddParticipantsCSVForm/steps/UploadCSV'
import { PageWrapper } from 'partials/PageWrapper'
import { Card } from 'common/Card'
import { AddSurveyProps } from './AddSurvey.types'

export const AddSurvey = function AddSurvey({ testId = 'AddSurvey' }: AddSurveyProps) {
	const { parse, parsedCSV } = useParseCSV()
	const [participantResponses, setParticipantResponses] = useState<SurveyResponses>([])
	const [surveyNames, setSurveyNames] = useState<string[]>([])
	console.log('🚀 ~ participantResponses', participantResponses)

	useEffect(() => {
		if (parsedCSV) {
			// const nonNullResponses = parsedCSV.map((response) => {
			// 	Object.entries(response).map(([key, entry]) => {
			// 		if (!entry) {
			// 			delete response[key]
			// 		}
			// 	})

			// 	return response
			// })

			const newResponses: SurveyResponses = parsedCSV.reduce(
				(responses: SurveyResponses, currentResponse) => {
					if (responses.length > 0) {
						const response = responses.find(
							(response) => response['participant_id'] === currentResponse['participant_id']
						)

						if (response) {
							const newResponse = { ...response, ...currentResponse }
							return [
								...responses.filter(
									(response) => response['participant_id'] !== currentResponse['participant_id']
								),
								newResponse
							]
						} else {
							responses.push(currentResponse)
						}
					} else {
						responses.push(currentResponse)
					}
					return responses
				},
				[]
			)

			const test = newResponses.reduce((acc: any, response, i) => {
				const participantSurveyResponses: any = []
				let objeto = {}
				const lastKey = Object.keys(response)[Object.keys(response).length - 1]
				Object.entries(response).map(([key, value]) => {
					if (key.includes('timestamp')) {
						participantSurveyResponses.push(objeto)
						const surveyName = key.split('_timestamp')[0]
						objeto = {
							surveyName,
							timestamp: value
						}
						if (i === 0) setSurveyNames((prev) => [...prev, surveyName])
					} else {
						if (value) objeto[key] = value
					}
					if (key === lastKey) {
						participantSurveyResponses.push(objeto)
					}
				})
				acc.push(participantSurveyResponses)
				return acc
			}, [])
			setParticipantResponses(test)
		}
	}, [parsedCSV])

	const handleUploadCSV = (values: UploadCSVInput) => {
		parse(values.csvFile[0])
	}

	return (
		<PageWrapper title='AddSurvey' testId={testId}>
			<Card>
				<UploadCSV onSubmit={handleUploadCSV} />

				{participantResponses.length > 0 && (
					<div className='pt-6'>
						<h2>{'Survey Responses'}</h2>
						<div>
							<b>{'Amount of Participants:'}&nbsp;</b>
							{participantResponses.length}
						</div>
						<div>
							<b>{'Amount of Surveys:'}&nbsp;</b>
							{surveyNames.length}
						</div>
					</div>
				)}
			</Card>
		</PageWrapper>
	)
}
