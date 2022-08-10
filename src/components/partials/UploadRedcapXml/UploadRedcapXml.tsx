/*!
 * UploadRedcapXml Page
 */
import cn from 'classnames'
import Image from 'next/image'
import { UploadXmlInput, UploadXmlSchema } from 'types/index'
import { useText } from 'hooks/useText'
import { DocumentsInput } from 'partials/DocumentsInput'
import { Form } from 'partials/Form'
import { ActionButtons } from 'common/ActionButtons'
import { Card } from 'common/Card'
import { Detail } from 'common/Detail'
import { Text } from 'common/Text'
import { handleValidate } from '../../../utils/client/handleValidate'
import { UploadRedcapXmlProps } from './UploadRedcapXml.types'

const maxFiles = 1
const acceptedFiles = {
	'application/xml': ['.xml']
}

export const UploadRedcapXml = function UploadRedcapXml({
	submitFile,
	testId = 'UploadRedcapXml'
}: UploadRedcapXmlProps) {
	const { t } = useText('redcap.upload')
	const steps = ['one', 'two', 'three', 'four', 'five', 'six']

	const onSubmit = async (values: UploadXmlInput) => {
		console.log('values: ', values)
	}

	return (
		<div className='flex flex-col gap-6' data-testid={testId}>
			<Card className='flex flex-col gap-6'>
				<div className='flex gap-2 items-center'>
					<div className='flex justify-center items-center rounded w-8 h-8'>
						<Image src='/icons/redcap.svg' width={28} height={28} alt={t('imageAlt')} />
					</div>
					<Text className='font-semibold text-xl'>{t('title')}</Text>
				</div>
				<div>
					<Detail label={t('subtitle')}>
						<div className='mt-4 mb-6'>
							{steps.map((step) => (
								<div key={step} className='flex flex-row'>
									<Text className='text-base text-gray-700 line-clamp-2'>
										{t(`steps.${step}.number`)}
									</Text>
									&nbsp;
									<Text
										className={cn(
											'text-base text-gray-700 line-clamp-2',
											step === 'five' && 'text-red-800'
										)}
									>
										{t(`steps.${step}.text`)}
									</Text>
								</div>
							))}
						</div>
						<div>
							<Text v='subtitle' className='font-semibold mb-2'>
								{t('detailsLabel')}
							</Text>
							<Form
								onSubmit={onSubmit}
								validate={(values) => handleValidate(values, UploadXmlSchema)}
								render={({ handleSubmit }) => (
									<form onSubmit={handleSubmit}>
										<DocumentsInput
											name='xmlFile'
											maxFiles={maxFiles}
											acceptedFiles={acceptedFiles}
											baseText={'redcap.upload'}
											image={{ src: '/icons/xmlFile.svg', width: '50', height: '50' }}
										/>
										<ActionButtons baseTextPath='redcap.upload' submitText='import' />
									</form>
								)}
							/>
						</div>
					</Detail>
				</div>
			</Card>
		</div>
	)
}
