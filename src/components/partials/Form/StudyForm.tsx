import { useText } from 'hooks/useText'
import { Form } from 'partials/Form'
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
	submitText
}: StudyFormProps) => {
	const { t } = useText('createStudy')

	return (
		<Form
			data-testid={testId}
			onSubmit={onSubmit}
			initialValues={initialValues}
			render={({ handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<div className='grid grid-cols-3 gap-4 lg:gap-6'>
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
					</div>
					<ModalFooter className='flex gap-2'>
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
