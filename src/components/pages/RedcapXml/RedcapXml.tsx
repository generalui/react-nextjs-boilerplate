/* eslint-disable react/jsx-key */

/*!
 * UploadRedcapXml Page
 */
import { useText } from 'hooks/useText'
import { MultiStepForm } from 'partials/MultiStepForm'
import { PageWrapper } from 'partials/PageWrapper'
import { UploadRedcapXml } from 'partials/UploadRedcapXml'
import { Breadcrumbs } from 'common/Breadcrumbs'
import { PageHeader } from 'common/PageHeader'
import { RedcapXmlProps } from './RedcapXml.types'

export const RedcapXml = function RedcapXml({ testId = 'RedcapXml' }: RedcapXmlProps) {
	const { t } = useText('studies.redcap.upload')

	const multiStepComponents = [<UploadRedcapXml />, <>{'container 2'}</>, <>{'container 3'}</>]
	return (
		<PageWrapper title={t('title')} testId={testId}>
			<PageHeader className='grid grid-cols-12 items-center'>
				{/* TODO: update breadcrumb */}
				<Breadcrumbs className='col-span-8' />
			</PageHeader>
			<div>
				<MultiStepForm stepComponents={multiStepComponents} />
			</div>
		</PageWrapper>
	)
}
