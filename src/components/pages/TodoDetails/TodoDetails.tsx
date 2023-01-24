/*!
 * Todo details page
 */
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getCombinedString } from 'utils/client/text'
import { useTodo } from 'hooks/api/todos/useTodo'
import { useCurrentUser } from 'hooks/api/users/useCurrentUser'
import { useText } from 'hooks/useText'
import { PageWrapper } from 'partials/PageWrapper'
import { TodoConsent } from 'partials/TodoConsent'
import { TodoDocumentation } from 'partials/TodoDocumentation'
import { TodoInfo } from 'partials/TodoInfo'
import { Breadcrumbs } from 'common/Breadcrumbs'
import { TodoStatusDropdown } from 'common/DropDown/TodoStatusDropdown'
import { PageHeader } from 'common/PageHeader'
import { TodoDetailsProps } from './TodoDetails.types'

export const TodoDetails = function TodoDetails({ testId = 'TodoDetails' }: TodoDetailsProps) {
	const router = useRouter()
	const { todoId = '' } = router.query
	const { t } = useText('todos.details')
	const { currentUser } = useCurrentUser()
	const isAdmin = currentUser?.role === 'admin'
	const singleTodoId = getCombinedString(todoId)
	const { data: todo, isLoading, isFetched, update } = useTodo(singleTodoId)
	const loading = !isFetched || isLoading

	useEffect(() => {
		if (isFetched && !todo?.id) {
			const path = currentUser?.role === 'admin' ? '/todos' : '/participant'
			router.push(path)
		}
	}, [isFetched, router, todo, singleTodoId, currentUser])

	return (
		<PageWrapper title={t('title')} testId={testId}>
			<PageHeader className='grid grid-cols-12 items-center'>
				<Breadcrumbs className='col-span-8' />
				{isAdmin && (
					<TodoStatusDropdown
						className='col-span-4'
						onChange={(status) => update.mutate({ status })}
						value={todo?.status || 'new'}
					/>
				)}
			</PageHeader>

			<div className='flex flex-col gap-6'>
				<TodoInfo isAdmin={isAdmin} singleTodoId={singleTodoId} loading={loading} todo={todo} />
				{isAdmin ? (
					<TodoDocumentation singleTodoId={singleTodoId} loading={loading} todo={todo} />
				) : (
					<TodoConsent todo={todo} />
				)}
			</div>
		</PageWrapper>
	)
}
