import { memo } from 'react'
import { TodoInputPreTransform, TodoSchema } from 'types/index'
import { formatFormDate } from 'utils/client/date'
import { useTodo } from 'hooks/api/todos/useTodo'
import { useModal } from 'hooks/useModal'
import { useText } from 'hooks/useText'
import { TodoForm } from 'partials/Form/TodoForm'
import { ModalButton } from 'partials/ModalButton'
import { Icon } from 'common/Icon'
import { EditTodoProps } from './EditTodo.types'

export const EditTodo = memo(function EditTodo({
	todoId,
	testId = 'EditTodo',
	disabled
}: EditTodoProps) {
	const { t } = useText('todos.edit')
	const { t: common } = useText('common.dataTypes')
	const { close } = useModal('edit-todo')
	const { data: todo, update } = useTodo(todoId)
	const coordinator = todo?.users?.[0]?.user

	const onSubmit = async (values: TodoInputPreTransform) => {
		if (update.isLoading) return

		await update.mutateAsync(TodoSchema.parse(values))
		close()
	}

	return (
		<>
			<div data-testid={testId}>
				<ModalButton
					disabled={!todo || disabled}
					name='edit-todo'
					modalTitle={t('title')}
					buttonChildren={
						<>
							<Icon icon='PencilSquareIcon' size='xs' />
							{t('buttonLabel')}
						</>
					}
					v='sm'
				>
					<>
						{todo && (
							<TodoForm
								keepDirtyOnReinitialize
								initialValues={{
									coordinator: coordinator
										? { value: coordinator.id, label: coordinator.email }
										: undefined,
									description: todo.description,
									endDate: formatFormDate(todo.endDate),
									image: todo.image?.image?.url || '',
									status: todo.status,
									title: todo.title,
									// TODO: refactor to use formatDataTypes
									dataTypes: todo.dataTypes?.map((dataType) => ({
										label: common(`${dataType}.label`),
										value: dataType
									}))
								}}
								isLoading={update.isLoading}
								onCancel={close}
								onSubmit={onSubmit}
								submitText={t('submit')}
							/>
						)}
					</>
				</ModalButton>
			</div>
		</>
	)
})
