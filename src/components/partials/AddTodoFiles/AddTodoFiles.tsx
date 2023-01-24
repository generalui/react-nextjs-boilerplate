// TODO: Rename this component to AddTodoDocumentation
import { useEffect } from 'react'
import { Form } from 'react-final-form'
import { TodoInput, publicFilesSchema } from 'types/index'
import { handleValidate } from 'utils/client/handleValidate'
import { useTodo } from 'hooks/api/todos/useTodo'
import { useModal } from 'hooks/useModal'
import { useText } from 'hooks/useText'
import { DocumentsInput } from 'partials/DocumentsInput'
import { ModalButton } from 'partials/ModalButton'
import { Icon } from 'common/Icon'
import { ModalFooterButtons } from 'common/ModalFooterButtons'
import { AddTodoFilesProps } from './AddTodoFiles.types'

const modalName = 'add-files'

export const AddTodoFiles = ({ todoId, className, testId = 'AddTodoFiles' }: AddTodoFilesProps) => {
	const { t } = useText('todos.files')
	const { close } = useModal(modalName)
	const { update } = useTodo(todoId)
	const { reset, isLoading, isSuccess } = update

	const onSubmit = async (values: Pick<TodoInput, 'documentation'>) => {
		update.mutate({ documentation: values.documentation })
	}

	useEffect(() => {
		if (!isLoading && isSuccess) {
			close()
			reset()
		}
	}, [isLoading, isSuccess, close, reset])

	return (
		<div className={className} data-testid={testId}>
			<ModalButton
				name={modalName}
				modalTitle={t('title')}
				v='sm'
				buttonChildren={
					<>
						<Icon icon='PlusIcon' className='text-white' size='xs' />
						{t('buttonLabel')}
					</>
				}
			>
				<Form
					onSubmit={onSubmit}
					validate={(values) => handleValidate(values, publicFilesSchema)}
					render={({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<DocumentsInput name='documentation' />
							<ModalFooterButtons
								isLoading={isLoading}
								modalName={modalName}
								actionButtonLabel={t('submitLabel')}
							/>
						</form>
					)}
				/>
			</ModalButton>
		</div>
	)
}
