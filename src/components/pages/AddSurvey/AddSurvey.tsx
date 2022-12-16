/*!
 * AddSurvey Page
 */
import { groupBy, isEmpty, omitBy } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { UploadCSVInput } from 'types/CSV'
import { useAddSurveyToStudy } from 'hooks/api/studies/useAddSurveyToStudy'
import { useParseCSV } from 'hooks/useParseCSV'
import { useText } from 'hooks/useText'
import { SurveyResponse, SurveyResponses } from 'pages/AddSurvey'
import { UploadCSV } from 'partials/AddParticipantsCSVForm/steps/UploadCSV'
import { PageWrapper } from 'partials/PageWrapper'
import { Breadcrumbs } from 'common/Breadcrumbs'
import { Card } from 'common/Card'
import { Icon } from 'common/Icon'
import { AddSurveyProps } from './AddSurvey.types'

export const AddSurvey = function AddSurvey({ testId = 'AddSurvey' }: AddSurveyProps) {
	const { parse, parsedCSV } = useParseCSV()
	const { t } = useText('studies.addSurvey')
	const { query, push } = useRouter()
	const { addSurvey } = useAddSurveyToStudy({
		studyId: query?.studyId as string,
		onSuccess: () => {
			push(`/studies/${query?.studyId}`)
		}
	})

	useEffect(() => {
		if (parsedCSV) {
			const surveyResponses = parsedCSV.reduce((responses: SurveyResponse, row) => {
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
					} else {
						if (value && key !== 'participant_id' && key !== 'redcap_event_name')
							currentResponse['survey_responses'] = currentResponse['survey_responses']
								? {
										...(currentResponse['survey_responses'] as Record<string, unknown>),
										[key]: value
								  }
								: {
										[key]: value
								  }
					}
				})
				participantSurveyResponses = [...participantSurveyResponses, currentResponse]
				return [...responses, ...participantSurveyResponses]
			}, [])

			const responsesByParticipant: SurveyResponses = Object.values(
				groupBy(omitBy(surveyResponses, isEmpty), 'participant_id')
			).map((responseByParticipant) => responseByParticipant)
			addSurvey.mutate(responsesByParticipant)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [parsedCSV])

	const handleUploadCSV = (values: UploadCSVInput) => {
		parse(values.csvFile[0])
	}

	return (
		<PageWrapper title={t('title')} testId={testId}>
			<Breadcrumbs className='col-span-8' />

			<Card className='flex flex-col gap-4'>
				<div className='flex items-center gap-2'>
					<Icon icon='DocumentIcon' />
					<h2 className={'font-semibold text-2xl'}>{t('title')}</h2>
				</div>
				<UploadCSV onSubmit={handleUploadCSV} />
			</Card>
		</PageWrapper>
	)
}
