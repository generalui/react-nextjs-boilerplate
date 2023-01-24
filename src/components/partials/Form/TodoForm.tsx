import { TodoSchema } from 'types/index'
import { handleValidate } from 'utils/client/handleValidate'
import { useText } from 'hooks/useText'
import { useTodoDataTypes } from 'hooks/useTodoDataTypes'
import { DataTypesSelect } from 'partials/DataTypesSelect'
import { DocumentsInput } from 'partials/DocumentsInput'
import { Form } from 'partials/Form'
import { UserSelect } from 'partials/UserSelect'
import { Button } from 'common/Button'
import { ImageInput } from 'common/ImageInput'
import { Input } from 'common/Input'
import { ModalFooter } from 'common/ModalFooter'
import { SubmitButton } from 'common/SubmitButton'
import { TodoFormProps } from './Form.types'

export const TodoForm = ({
	initialValues,
	isLoading,
	onCancel,
	onSubmit,
	testId = 'CreateTodo',
	create,
	submitText
}: TodoFormProps) => {
	const { t } = useText('createTodo')
	const todoDataTypes = useTodoDataTypes()

	return (
		<Form
			keepDirtyOnReinitialize
			data-testid={testId}
			onSubmit={onSubmit}
			initialValues={initialValues}
			validate={(values) => handleValidate(values, TodoSchema)}
			render={({ handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<div className='grid grid-cols-3 gap-4 pb-6 lg:gap-6'>
						<div className='col-span-3 lg:col-span-1 h-full'>
							<ImageInput
								name='image'
								className='h-full w-full'
								initialValue={initialValues?.image}
							/>
						</div>

						<div className='col-span-3 lg:col-span-2'>
							<div className='flex flex-col justify-between gap-4 lg:gap-6 h-full'>
								<div className=''>
									<Input
										label={t('fields.title')}
										labelClassName='flex lg'
										name='title'
										placeholder={t('placeholders.title')}
										type='textarea'
									/>
								</div>
							</div>
						</div>
						<div className='col-span-3'>
							<div className='grid grid-cols-2 gap-4 lg:gap-6'>
								<div className='col-span-2 md:col-span-1'>
									<UserSelect
										label={t('fields.coordinator')}
										name='coordinator'
										placeholder={t('placeholders.coordinator')}
									/>
								</div>
								<div className='col-span-2 md:col-span-1'>
									<Input
										label={t('fields.endDate')}
										name='endDate'
										type='date'
										placeholder={t('placeholders.endDate')}
									/>
								</div>
							</div>
						</div>
						<div className='col-span-3'>
							<Input
								label={t('fields.description')}
								name='description'
								placeholder={t('placeholders.description')}
								type='textarea'
								rows={5}
							/>
						</div>
						<div className='col-span-3'>
							<DataTypesSelect
								label={t('fields.dataTypes')}
								options={todoDataTypes}
								name='dataTypes'
								isMulti
							/>
						</div>
						{create && (
							<div className='col-span-3'>
								<DocumentsInput name='documentation' label={t('fields.documentation.label')} />
							</div>
						)}
					</div>
					<ModalFooter>
						<SubmitButton
							className='w-full justify-center md:justify-start md:w-auto'
							isLoading={isLoading}
							disableOnLoading
						>
							{submitText || t('buttons.submit')}
						</SubmitButton>
						<Button
							onClick={onCancel}
							v='secondary'
							className='w-full justify-center md:justify-start md:w-auto'
						>
							{t('buttons.cancel')}
						</Button>
					</ModalFooter>
				</form>
			)}
		/>
	)
}
