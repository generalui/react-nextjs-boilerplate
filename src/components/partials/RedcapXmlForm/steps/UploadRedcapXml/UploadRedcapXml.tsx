import Image from 'next/image'
import { UploadXmlSchema } from 'types/index'
import { handleValidate } from 'utils/client/handleValidate'
import { useText } from 'hooks/useText'
import { DocumentsInput } from 'partials/DocumentsInput'
import { Form } from 'partials/Form'
import { ActionButtons } from 'common/ActionButtons'
import { Card } from 'common/Card'
import { Detail } from 'common/Detail'
import { OrderedList } from 'common/OrderedList'
import { Text } from 'common/Text'
import { UploadRedcapXmlProps } from './UploadRedcapXml.types'

const maxFiles = 1
const acceptedFiles = {
	'application/xml': ['.xml']
}

export const UploadRedcapXml = function UploadRedcapXml({
	onSubmit,
	onCancel,
	testId = 'UploadRedcapXml',
	title
}: UploadRedcapXmlProps) {
	const { t } = useText('studies.redcapXMLForm.upload')
	const steps = Array.from({ length: 6 }, (_, i) => i + 1).map((step) => {
		return {
			text: t(`steps.${step}`),
			className: step === 5 ? 'text-danger' : undefined
		}
	})

	return (
		<div data-testid={testId}>
			<Text v='h2'>{t('subtitle')}</Text>

			<OrderedList list={steps} />

			<div>
				<Form
					onSubmit={onSubmit}
					validate={(values) => handleValidate(values, UploadXmlSchema)}
					render={({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<DocumentsInput
								label={t('detailsLabel')}
								name='xmlFile'
								maxFiles={maxFiles}
								acceptedFiles={acceptedFiles}
								localizationScope={'studies.redcapXMLForm.upload'}
								image={{ src: '/icons/xmlFile.svg', width: '50', height: '50' }}
							/>
							<ActionButtons submitText={t('submit')} onCancel={onCancel} />
						</form>
					)}
				/>
			</div>
		</div>
	)
}
