import { PlusIcon } from '@heroicons/react/solid'
import { memo } from 'react'
import { Form } from 'react-final-form'
import { StudyInput } from 'types/index'
import { useCreateStudy } from 'hooks/api/studies/useCreateStudy'
import { useModal } from 'hooks/useModal'
import { useText } from 'hooks/useText'
import { ModalButton } from 'partials/ModalButton'
import { Button } from 'common/Button'
import { ImageInput } from 'common/ImageInput'
import { Input } from 'common/Input'
import { ModalFooter } from 'common/ModalFooter'
import { SubmitButton } from 'common/SubmitButton'
import { DataTypesSelect } from '../DataTypesSelect'
import { CreateStudyProps } from './CreateStudy.types'

export const CreateStudy = memo(function CreateStudy({ testId = 'CreateStudy' }: CreateStudyProps) {
	const { t } = useText('createStudy')
	const { createStudy, isError, isLoading } = useCreateStudy()
	const { close } = useModal('create-study')

	const onSubmit = async (values: StudyInput) => {
		if (isLoading) return
		console.log('values: ', values)

		// await createStudy(StudySchema.parse(values))
		// close()
	}

	return (
		<>
			<div data-testid={testId}>
				<ModalButton
					name='create-study'
					modalTitle={t('title')}
					buttonChildren={
						<>
							<PlusIcon className='w-5 h-5 mr-1 inline' /> {t('title')}
						</>
					}
				>
					<Form
						data-testid={testId}
						onSubmit={onSubmit}
						render={({ handleSubmit }) => (
							<form onSubmit={handleSubmit}>
								<div className='grid grid-cols-3 gap-2'>
									<ImageInput name='image' className='row-span-3' />
									<div className='col-span-2 row-span-2'>
										<Input name='title' placeholder='Title' type='textarea' />
									</div>
									<div>
										<label className='text-xs text-gray-500' htmlFor='coordinator'>
											{t('fields.coordinator')}
										</label>
										<Input name='coordinator' type='text' placeholder='Coordinator' />
									</div>
									<div>
										<label className='text-xs text-gray-500' htmlFor='endDate'>
											{t('fields.endDate')}
										</label>
										<Input name='endDate' type='date' placeholder='Select End Date' />
									</div>
									<label className='text-xs text-gray-500' htmlFor='description'>
										{t('fields.description')}
									</label>
									<div className='col-span-3'>
										<Input name='description' placeholder='Description' type='textarea' rows={5} />
									</div>
									<div className='col-span-3'>
										<DataTypesSelect />
									</div>
									<div className='col-span-3'>
										<ModalFooter>
											<SubmitButton isError={isError} isLoading={isLoading} disableOnLoading>
												{t('buttons.submit')}
											</SubmitButton>
											<Button onClick={close}>{t('buttons.cancel')}</Button>
										</ModalFooter>
									</div>
								</div>
							</form>
						)}
					/>
				</ModalButton>
			</div>
		</>
	)
})
