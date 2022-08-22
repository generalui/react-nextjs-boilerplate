/* eslint-disable react/jsx-key */

/*!
 * UploadRedcapXml Page
 */
import { useText } from 'hooks/useText'
import { PageWrapper } from 'partials/PageWrapper'
import { RedcapXmlForm } from 'partials/RedcapXmlForm'
import { Breadcrumbs } from 'common/Breadcrumbs'
import { PageHeader } from 'common/PageHeader'
import { RedcapXmlProps } from './RedcapXml.types'

export const RedcapXml = function RedcapXml({ testId = 'RedcapXml' }: RedcapXmlProps) {
	const { t } = useText('studies.redcapXMLForm.upload')

	return (
		<PageWrapper title={t('title')} testId={testId}>
			<PageHeader className='grid grid-cols-12 items-center'>
				<Breadcrumbs className='col-span-8' />
			</PageHeader>
			<div>
				<RedcapXmlForm />
			</div>
		</PageWrapper>
	)
}
