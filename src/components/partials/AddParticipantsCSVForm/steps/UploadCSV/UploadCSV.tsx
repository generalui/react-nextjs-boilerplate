import { UploadCSVSchema } from 'types/index'
import { handleValidate } from 'utils/client/handleValidate'
import { useText } from 'hooks/useText'
import { DocumentsInput } from 'partials/DocumentsInput'
import { Form } from 'partials/Form'
import { ActionButtons } from 'common/ActionButtons'
import { OrderedList } from 'common/OrderedList'
import { Text } from 'common/Text'
import { UploadCSVProps } from './UploadCSV.types'

const maxFiles = 1
const acceptedFileTypes = {
	'text/csv': ['.csv']
}

export const UploadCSV = function UploadCSV({
	onSubmit,
	onCancel,
	testId = 'UploadCSV'
}: UploadCSVProps) {
	const { t } = useText('studies.addParticipants.form.upload')
	const steps = Array.from({ length: 4 }, (_, i) => i + 1).map((step) => {
		return {
			text: t(`steps.${step}`),
			className: step === 5 ? 'text-danger' : undefined
		}
	})

	return (
		<div className='flex flex-col gap-6' data-testid={testId}>
			<div className='flex flex-col gap-4'>
				<Text v='h2'>{t('subtitle')}</Text>

				<OrderedList list={steps} />
			</div>

			<div>
				<Form
					onSubmit={onSubmit}
					validate={(values) => handleValidate(values, UploadCSVSchema)}
					render={({ handleSubmit }) => (
						<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
							<DocumentsInput
								label={t('detailsLabel')}
								name='csvFile'
								maxFiles={maxFiles}
								acceptedFileTypes={acceptedFileTypes}
								localizationScope={'studies.redcapXMLForm.upload'}
								image={{ src: '/icons/doc_CSV.svg', width: '50', height: '50' }}
							/>
							<ActionButtons submitText={t('submit')} onCancel={onCancel} />
						</form>
					)}
				/>
			</div>
		</div>
	)
}
