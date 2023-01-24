import { useText } from 'hooks/useText'
import { AddTodoFiles } from 'partials/AddTodoFiles'
import { DocumentationList } from 'common/DocumentationList'
import { TodoDocumentationProps } from './TodoDocumentation.types'

export const TodoDocumentation = ({
	singleTodoId,
	todo,
	loading,
	testId = 'TodoDocumentation'
}: TodoDocumentationProps) => {
	const { t: documentation } = useText('todos.documentation')

	return (
		<>
			<div data-testid={testId}>
				<DocumentationList
					action={<AddTodoFiles todoId={singleTodoId} />}
					className='flex flex-col gap-6'
					iconProps={{ icon: 'DocumentTextIcon', wrapperClass: 'bg-green-300' }}
					title={documentation('title')}
					documents={todo?.documentation || []}
					isLoading={loading}
				/>
			</div>
		</>
	)
}
