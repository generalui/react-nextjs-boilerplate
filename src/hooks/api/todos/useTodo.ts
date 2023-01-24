import { useSession } from 'next-auth/react'
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from 'react-query'
import { Todo, TodoInput } from 'types/Todo'
import { reactQueryClient } from 'utils/client/react-query'
import { toast } from 'utils/client/toast'
import { createPartialTodoFromFormData } from 'utils/models/todos'
import { getTodo, updateTodo } from 'utils/requests/todos'
import { useText } from 'hooks/useText'

export const useTodo = (
	todoId?: string
): UseQueryResult<Todo> & {
	update: UseMutationResult<Todo, unknown, Partial<TodoInput>>
} => {
	const { data: session } = useSession()
	const { t: error } = useText('todos.error')
	const { t: success } = useText('todos.success')
	const query = useQuery(['todos', todoId], () => getTodo(todoId), {
		enabled: !!todoId,
		retry: false
	})

	const updateMutation = useMutation(
		`todo-${todoId}`,
		(todoUpdate: Partial<TodoInput>) => updateTodo(todoId || '', todoUpdate),
		{
			onMutate: async (todoUpdate) => {
				await reactQueryClient.cancelQueries(['todos', todoId])
				const previousTodo = reactQueryClient.getQueryData<Todo>(['todos', todoId])

				if (!previousTodo) {
					toast(error('doesNotExist'), 'error')
					return
				}

				const partialTodo = createPartialTodoFromFormData(todoUpdate, session)

				const optimisticTodo: Todo = {
					...previousTodo,
					...partialTodo,
					documentation: [...previousTodo.documentation, ...(partialTodo?.documentation || [])]
				}

				// Optimistically update to the new value
				reactQueryClient.setQueryData(['todos', todoId], {
					...previousTodo,
					...optimisticTodo
				})

				return { previousTodo }
			},
			onSuccess: () => {
				toast(success('updated'))
			},
			onError: (_err, _newTodo, context?: { previousTodo: Todo }) => {
				reactQueryClient.setQueryData(['todos', todoId], context?.previousTodo)
				toast(error('failedToUpdate'), 'error')
			},
			onSettled: () => {
				reactQueryClient.invalidateQueries(['todos', todoId])
			}
		}
	)

	return {
		...query,
		update: updateMutation
	}
}
