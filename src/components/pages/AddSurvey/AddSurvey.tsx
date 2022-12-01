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
	console.log('🚀 ~ participantResponses', participantResponses)

	useEffect(() => {
		if (parsedCSV) {
			const nonNullResponses = parsedCSV.map((response) => {
				Object.entries(response).map(([key, entry]) => {
					if (!entry) {
						delete response[key]
					}
				})

				return response
			})

			const newResponses: SurveyResponses = nonNullResponses.reduce(
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
			setParticipantResponses(newResponses)
		}
	}, [parsedCSV])

	const handleUploadCSV = (values: UploadCSVInput) => {
		parse(values.csvFile[0])
	}

	return (
		<PageWrapper title='AddSurvey' testId={testId}>
			<Card>
				<UploadCSV onSubmit={handleUploadCSV} />
			</Card>
		</PageWrapper>
	)
}
