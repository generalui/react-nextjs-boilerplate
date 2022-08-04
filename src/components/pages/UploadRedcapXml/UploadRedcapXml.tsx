/*!
 * UploadRedcapXml Page
 */
import Image from 'next/image'
import { useText } from 'hooks/useText'
import { PageWrapper } from 'partials/PageWrapper'
import { Breadcrumbs } from 'common/Breadcrumbs'
import { Card } from 'common/Card'
import { PageHeader } from 'common/PageHeader'
import { Text } from 'common/Text'
import { UploadRedcapXmlProps } from './UploadRedcapXml.types'

export const UploadRedcapXml = function UploadRedcapXml({
	testId = 'UploadRedcapXml'
}: UploadRedcapXmlProps) {
	const { t } = useText('redcap.upload')

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
				</Card>
			</div>
		</PageWrapper>
	)
}
