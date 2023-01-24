import { useSession } from 'next-auth/react'
import { useMutation } from 'react-query'
import { Todo } from 'types/index'
import { reactQueryClient } from 'utils/client/react-query'
import { toast } from 'utils/client/toast'
import { createOptimisticTodoFromFormData } from 'utils/models/todos'
import { createTodo } from 'utils/requests/todos'
import { useText } from 'hooks/useText'

export function useCreateTodo() {
	const { t } = useText('todos.create')

	const { data: session } = useSession()
	const { mutate, ...mutation } = useMutation('create-todo', createTodo, {
		onMutate: async (newTodo) => {
			// Cancel current queries for the todos list
			await reactQueryClient.cancelQueries('todos')

			// Create optimistic todo
			const optimisticTodo: Todo = createOptimisticTodoFromFormData(newTodo, session)

			// Add optimistic todo to todos list
			reactQueryClient.setQueryData('todos', (old: Todo[] | undefined) => [
				optimisticTodo,
				...(old || [])
			])

			// Return context with the optimistic todo ID
			return { todoId: optimisticTodo.id }
		},
		onSuccess: () => {
			reactQueryClient.invalidateQueries(['todos'])
			toast(t('success'))
		},
		onError: (_error, _variables, context?: { todoId: string }) => {
			// Remove optimistic todo from the todos list
			reactQueryClient.setQueryData('todos', (old: Todo[] | undefined) =>
				(old || ([] as Todo[])).filter((todo: Todo) => todo.id !== context?.todoId)
			)
			toast(t('error'), 'error')
		},
		retry: 3
	})

	return { createTodo: mutate, ...mutation }
}
