import { selectOptionsType } from 'types/index'
import { useText } from 'hooks/useText'
import { Form } from 'partials/Form'
import { Button } from 'common/Button'
import { ImageInput } from 'common/ImageInput'
import { Input } from 'common/Input'
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
					<div className='grid grid-cols-3 gap-2'>
						<ImageInput name='image' className='row-span-3' />
						<div className='col-span-2 row-span-2'>
							<Input name='title' placeholder={t('placeholders.title')} type='textarea' />
						</div>
						<div>
							<label className='text-xs text-gray-500' htmlFor='coordinator'>
								{t('fields.coordinator')}
							</label>
							<Input name='coordinator' type='text' placeholder={t('placeholders.coordinator')} />
						</div>
						<div>
							<label className='text-xs text-gray-500' htmlFor='endDate'>
								{t('fields.endDate')}
							</label>
							<Input name='endDate' type='date' placeholder={t('placeholders.endDate')} />
						</div>
						<label className='text-xs text-gray-500' htmlFor='description'>
							{t('fields.description')}
						</label>
						<div className='col-span-3'>
							<Input
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
						<div className='col-span-3 flex gap-2'>
							<SubmitButton isLoading={isLoading} disableOnLoading>
								{submitText || t('buttons.submit')}
							</SubmitButton>
							<Button onClick={onCancel} v='secondary'>
								{t('buttons.cancel')}
							</Button>
						</div>
					</div>
				</form>
			)}
		/>
	)
}
