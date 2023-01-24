import { memo, useEffect } from 'react'
import { TodoInputPreTransform, TodoSchema } from 'types/index'
import { useCreateTodo } from 'hooks/api/todos/useCreateTodo'
import { useModal } from 'hooks/useModal'
import { useText } from 'hooks/useText'
import { TodoForm } from 'partials/Form/TodoForm'
import { ModalButton } from 'partials/ModalButton'
import { Icon } from 'common/Icon'
import { CreateTodoProps } from './CreateTodo.types'

export const CreateTodo = memo(function CreateTodo({ testId = 'CreateTodo' }: CreateTodoProps) {
	const { t } = useText('createTodo')
	const { close } = useModal('create-todo')
	const { createTodo, isLoading, isSuccess, reset } = useCreateTodo()

	const onSubmit = async (values: TodoInputPreTransform) => {
		if (isLoading) return
		const newTodo = {
			...TodoSchema.parse(values),
			image: values.image,
			documentation: values.documentation
		}
		await createTodo(newTodo)
	}

	useEffect(() => {
		if (!isLoading && isSuccess) {
			close()
			reset()
		}
	}, [isLoading, isSuccess, close, reset])

	return (
		<>
			<div data-testid={testId}>
				<ModalButton
					name='create-todo'
					modalTitle={t('title')}
					buttonChildren={
						<>
							<Icon icon='PlusIcon' className='mr-1' /> {t('title')}
						</>
					}
				>
					<TodoForm create isLoading={isLoading} onCancel={close} onSubmit={onSubmit} />
				</ModalButton>
			</div>
		</>
	)
})
