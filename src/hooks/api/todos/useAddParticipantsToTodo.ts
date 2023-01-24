import { AxiosError } from 'axios'
import { UseMutateFunction, useMutation } from 'react-query'
import { Todo } from 'types/Todo'
import { AddParticipantsInput, NewParticipants } from 'types/TodoParticipants'
import { reactQueryClient } from 'utils/client/react-query'
import { toast } from 'utils/client/toast'
import { addParticipantsToTodo } from 'utils/requests/todos'
import { useText } from 'hooks/useText'

export type UseAddParticipantsToTodoProps = {
	todoId?: string
	onSuccess?: () => void
	onError?: () => void
}
export const useAddParticipantsToTodo = ({
	todoId = '',
	onSuccess,
	onError
}: UseAddParticipantsToTodoProps): {
	mutate: UseMutateFunction<
		undefined,
		unknown,
		{
			todoId: string
			participants: {
				email: string
				name: string
			}[]
		},
		{
			previousTodo: Todo
		}
	>
	data?: NewParticipants
} => {
	const { t: error } = useText('todos.error')
	const { t: success } = useText('todos.success')

	const { mutate, data } = useMutation(
		`todo-${todoId}-add-participants`,
		(participantInput: AddParticipantsInput) =>
			addParticipantsToTodo(todoId, participantInput.participants),
		{
			onSuccess: () => {
				toast(success('participantsAdded'))
				onSuccess?.()
			},
			onError: (err, _newTodo, context?: { previousTodo: Todo }) => {
				reactQueryClient.setQueryData(['todos', todoId], context?.previousTodo)

				toast(
					(err as AxiosError<{ message: string }>)?.response?.data?.message ||
						error('failedToAddParticipants'),
					'error'
				)
				onError?.()
			},
			onSettled: () => {
				reactQueryClient.invalidateQueries(['todos', todoId])
			}
		}
	)

	return {
		mutate,
		data
	}
}
