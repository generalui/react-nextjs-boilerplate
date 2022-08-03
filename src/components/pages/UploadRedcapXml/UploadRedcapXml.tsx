/*!
 * UploadRedcapXml Page
 */
import { PageWrapper } from 'partials/PageWrapper'
import { UploadRedcapXmlProps } from './UploadRedcapXml.types'

export const UploadRedcapXml = function UploadRedcapXml({
	testId = 'UploadRedcapXml'
}: UploadRedcapXmlProps) {
	return (
		<PageWrapper title='UploadRedcapXml' testId={testId}>
			<>{'RedCap'}</>
		</PageWrapper>
	)
}
