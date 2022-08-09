/* eslint-disable react/jsx-key */

/*!
 * UploadRedcapXml Page
 */
import { useState } from 'react'
import { useText } from 'hooks/useText'
import { MultiStepForm } from 'partials/MultiStepForm'
import { PageWrapper } from 'partials/PageWrapper'
import { UploadRedcapXml } from 'partials/UploadRedcapXml'
import { Breadcrumbs } from 'common/Breadcrumbs'
import { PageHeader } from 'common/PageHeader'
import { RedcapXmlProps } from './RedcapXml.types'

type RedcapXMLResults = Array<File | undefined>

export const RedcapXml = function RedcapXml({ testId = 'RedcapXml' }: RedcapXmlProps) {
	const [xmlFile, setXmlFile] = useState<File | undefined>()
	const { t } = useText('redcap.upload')

	const setFileFromDropzone = (file: File) => {
		setXmlFile(file)
	}

	const multiStepComponents = [
		<UploadRedcapXml submitFile={setFileFromDropzone} />,
		<>{'container 2'}</>,
		<>{'container 3'}</>
	]

	const results: RedcapXMLResults = [
		xmlFile // result for step 1
	]

	return (
		<PageWrapper title={t('title')} testId={testId}>
			<PageHeader className='grid grid-cols-12 items-center'>
				{/* TODO: update breadcrumb */}
				<Breadcrumbs className='col-span-8' />
			</PageHeader>
			<div>
				<MultiStepForm stepComponents={multiStepComponents} results={results} />
			</div>
		</PageWrapper>
	)
}
