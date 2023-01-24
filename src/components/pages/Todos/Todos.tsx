import { getQueryNumber } from 'utils/getQueryNumber'
import { useTodos } from 'hooks/api/todos/useTodos'
import { useRouterQuery } from 'hooks/useRouterQuery'
import { CreateTodo } from 'partials/CreateTodo'
import { PageWrapper } from 'partials/PageWrapper'
import { Pagination } from 'partials/Pagination'
import { TodoList } from 'partials/TodoList'
import { TodosProps } from './Todos.types'

export const Todos = function Todos({ testId = 'Todos' }: TodosProps) {
	const { query } = useRouterQuery('page')
	const page = getQueryNumber(query) || 1
	const { todos = [], count, isLoading } = useTodos({ page })

	return (
		<PageWrapper title='Todos' testId={testId}>
			<CreateTodo />
			<TodoList todos={todos} isLoading={isLoading} />
			<Pagination totalCount={count} visibleCount={todos.length} />
		</PageWrapper>
	)
}
