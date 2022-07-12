import { selectOptionsType } from 'types/index'
import { useText } from 'hooks/useText'
import { Form } from 'partials/Form'
import { Button } from 'common/Button'
import { ImageInput } from 'common/ImageInput'
import { Input } from 'common/Input'
import { ModalFooter } from 'common/ModalFooter'
import { SubmitButton } from 'common/SubmitButton'
import { DataTypesSelect } from '../DataTypesSelect'
import { StudyFormProps } from './Form.types'

export const StudyForm = ({
	initialValues,
	isLoading,
	onCancel,
	onSubmit,
	testId = 'CreateStudy',
	submitText
}: StudyFormProps) => {
	const { t } = useText('createStudy')
	const { t: common } = useText('common.dataTypes')

	const studyDataTypes: selectOptionsType[] = [
		{ label: common('consents.label'), value: 'consents' },
		{ label: common('geneticData.label'), value: 'geneticData' },
		{ label: common('healthRecords.label'), value: 'healthRecords' },
		{ label: common('specimens.label'), value: 'specimens' }
	]

	return (
		<Form
			data-testid={testId}
			onSubmit={onSubmit}
			initialValues={initialValues}
			render={({ handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<div className='grid grid-cols-3 gap-4 pb-6 lg:gap-6'>
						<div className='col-span-3 lg:col-span-1'>
							<ImageInput name='image' className='h-auto max-h-48 w-full' />
						</div>

						<div className='col-span-3 lg:col-span-2'>
							<div className='flex flex-col justify-between gap-4 lg:gap-6 h-full'>
								<div className=''>
									<Input
										label={t('fields.title')}
										labelClassName='flex lg:hidden'
										name='title'
										placeholder={t('placeholders.title')}
										type='textarea'
									/>
								</div>
								<div>
									<div className='grid grid-cols-2 gap-4 lg:gap-6'>
										<div className='col-span-2 md:col-span-1'>
											<Input
												label={t('fields.coordinator')}
												name='coordinator'
												type='text'
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
							<label className='text-xs text-gray-500' htmlFor='description'>
								{t('fields.dataTypes')}
							</label>
							<DataTypesSelect options={studyDataTypes} />
						</div>
						<div className='col-span-3'>
							<label className='text-xs text-gray-500' htmlFor='description'>
								{t('fields.documentation.label')}
							</label>
							<div className='w-full bg-gray-100 h-44 border border-solid  border-gray-400 border-dashed flex flex-col justify-center items-center'>
								<div>{'01'}</div>
								<div>{t('fields.documentation.files')}</div>
								<div>{'03'}</div>
							</div>
						</div>
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
