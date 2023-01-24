import { axios } from 'utils/client/axios'
import { SurveyResponses } from 'pages/AddSurvey'

export const addSurveyToTodo = async (todoId?: string, surveyResponses?: SurveyResponses) => {
	if (todoId === undefined) return
	const response = await axios.post(`/todos/${todoId}/add-survey`, { surveyResponses })
	return response.data
}
