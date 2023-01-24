import { useMutation } from 'react-query'
import { toast } from 'utils/client/toast'
import { addSurveyToTodo } from 'utils/requests/addSurvey'
import { useText } from 'hooks/useText'
import { SurveyResponses } from 'pages/AddSurvey'

export type UseAddSurveyToTodoProps = {
	todoId?: string
	onSuccess?: () => void
	onError?: () => void
}

export const useAddSurveyToTodo = ({
	todoId = '',
	onSuccess,
	onError
}: UseAddSurveyToTodoProps) => {
	const { t: error } = useText('todos.error')
	const { t: success } = useText('todos.success')

	const addSurvey = useMutation(
		'add-survey-to-todo',
		(surveyResponses: SurveyResponses) => {
			return addSurveyToTodo(todoId, surveyResponses)
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
