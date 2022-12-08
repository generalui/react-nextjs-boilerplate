import { axios } from 'utils/client/axios'
import { SurveyResponses } from 'pages/AddSurvey'

export const addSurveyToStudy = async (studyId?: string, surveyResponses?: SurveyResponses) => {
	if (studyId === undefined) return
	const response = await axios.post(`/studies/${studyId}/add-survey`, { surveyResponses })
	return response.data
}
