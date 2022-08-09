/*!
 * UploadRedcapXml Page
 */
import Image from 'next/image'
import { Form } from 'react-final-form'
import { useText } from 'hooks/useText'
import { DocumentsInput } from 'partials/DocumentsInput'
import { PageWrapper } from 'partials/PageWrapper'
import { ActionButtons } from 'common/ActionButtons'
import { Breadcrumbs } from 'common/Breadcrumbs'
import { Card } from 'common/Card'
import { Detail } from 'common/Detail'
import { OrderedList } from 'common/OrderedList'
import { PageHeader } from 'common/PageHeader'
import { Text } from 'common/Text'
import { UploadRedcapXmlProps } from './UploadRedcapXml.types'

const maxFiles = 1
const acceptedFiles = {
	'application/xml': ['.xml']
}

export const UploadRedcapXml = function UploadRedcapXml({
	testId = 'UploadRedcapXml'
}: UploadRedcapXmlProps) {
	const { t } = useText('studies.redcap.upload')
	const steps = Array.from({ length: 6 }, (_, i) => i + 1).map((step) => {
		return {
			text: t(`steps.${step}`),
			className: step === 5 ? 'text-danger' : undefined
		}
	})

	const onSubmit = async (values: any) => {
		console.log('values: ', values)
	}

	return (
		<PageWrapper title={t('title')} testId={testId}>
			<PageHeader className='grid grid-cols-12 items-center'>
				{/* TODO: update breadcrumb */}
				<Breadcrumbs className='col-span-8' />
			</PageHeader>
			<div className='flex flex-col gap-6'>
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
								<OrderedList list={steps} />
							</div>
							<div>
								<Text v='subtitle' className='font-semibold mb-2'>
									{t('detailsLabel')}
								</Text>
								<Form
									onSubmit={onSubmit}
									render={({ handleSubmit }) => (
										<form onSubmit={handleSubmit}>
											<DocumentsInput
												name='redcapXml'
												maxFiles={maxFiles}
												acceptedFiles={acceptedFiles}
												localizationScope={'studies.redcap.upload'}
												image={{ src: '/icons/xmlFile.svg', width: '50', height: '50' }}
											/>
											<ActionButtons
												localizationScope='studies.redcap.upload'
												submitText={t('import')}
											/>
										</form>
									)}
								/>
							</div>
						</Detail>
					</div>
				</Card>
			</div>
		</PageWrapper>
	)
}
