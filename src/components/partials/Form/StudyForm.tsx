import { StudySchema } from 'types/index'
import { handleValidate } from 'utils/client/handleValidate'
import { useStudyDataTypes } from 'hooks/useStudyDataTypes'
import { useText } from 'hooks/useText'
import { DataTypesSelect } from 'partials/DataTypesSelect'
import { DocumentsInput } from 'partials/DocumentsInput'
import { Form } from 'partials/Form'
import { UserSelect } from 'partials/UserSelect'
import { Button } from 'common/Button'
import { ImageInput } from 'common/ImageInput'
import { Input } from 'common/Input'
import { ModalFooter } from 'common/ModalFooter'
import { SubmitButton } from 'common/SubmitButton'
import { StudyFormProps } from './Form.types'

export const StudyForm = ({
	initialValues,
	isLoading,
	onCancel,
	onSubmit,
	testId = 'CreateStudy',
	create,
	submitText
}: StudyFormProps) => {
	const { t } = useText('createStudy')
	const studyDataTypes = useStudyDataTypes()

	return (
		<Form
			keepDirtyOnReinitialize
			data-testid={testId}
			onSubmit={onSubmit}
			initialValues={initialValues}
			validate={(values) => handleValidate(values, StudySchema)}
			render={({ handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<div className='grid grid-cols-3 gap-4 pb-6 lg:gap-6'>
						<div className='col-span-3 lg:col-span-1'>
							<ImageInput name='image' className='h-full w-full' value={initialValues?.image} />
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
								<div>
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
								options={studyDataTypes}
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
