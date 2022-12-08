import { useMutation } from 'react-query'
import { toast } from 'utils/client/toast'
import { addSurveyToStudy } from 'utils/requests/addSurvey'
import { useText } from 'hooks/useText'
import { SurveyResponses } from 'pages/AddSurvey'

export type UseAddSurveyToStudyProps = {
	studyId?: string
	onSuccess?: () => void
	onError?: () => void
}

export const useAddSurveyToStudy = ({
	studyId = '',
	onSuccess,
	onError
}: UseAddSurveyToStudyProps) => {
	const { t: error } = useText('studies.error')
	const { t: success } = useText('studies.success')

	const addSurvey = useMutation(
		'add-survey-to-study',
		(surveyResponses: SurveyResponses) => {
			return addSurveyToStudy(studyId, surveyResponses)
		},
		{
			onSuccess: () => {
				toast(success('surveyAdded'))
				onSuccess?.()
			},
			onError: () => {
				toast(error('failedToAddSurvey'), 'error')
				onError?.()
			}
		}
	)
	return { addSurvey }
}
