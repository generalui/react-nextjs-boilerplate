/* eslint-disable react/jsx-key */
import Image from 'next/image'
import { useState } from 'react'
import { UploadXmlInput } from 'types/index'
import { useXMLParser } from 'hooks/useParseXML'
import { useRouter } from 'hooks/useRouter'
import { useText } from 'hooks/useText'
import { MultiStepForm } from 'partials/MultiStepForm'
import { RedcapXmlFormProps } from './RedcapXmlForm.types'
import { MapRedcapFields } from './steps/MapRedcapFields'
import { UploadRedcapXml } from './steps/UploadRedcapXml'

const UPLOAD_REDCAP_XML_FORM_NAME = 'upload-redcap-xml-form'

export const RedcapXmlForm = ({ className, testId = 'RedcapXmlForm' }: RedcapXmlFormProps) => {
	const { parse, parsedXML } = useXMLParser()
	const [currentStep, setCurrentStep] = useState<number>(0)
	// const [clientData, setClientData] = useState<XMLParsed>()
	const [inProgress, setInProgress] = useState<boolean>()
	// const [participantList, setParticipantList] = useState<File>()
	// const { currentStep, step } = useMultiStepForm()
	const { t } = useText('studies.redcapXMLForm')
	const { forceBack } = useRouter()

	const handleCancel = () => {
		// Clean up
		forceBack()
	}

	const handleUploadRedcapXml = (values: UploadXmlInput) => {
		parse(values.xmlFile[0])
		setCurrentStep(currentStep + 1)
		setInProgress(true)
	}

	const handleMapRedcapFields = (values: UploadXmlInput) => {
		console.log('handleMapRedcapFields ~ values', values)
		setCurrentStep(currentStep + 1)
	}

	const multiStepComponents = [
		<UploadRedcapXml onSubmit={handleUploadRedcapXml} onCancel={handleCancel} />,
		<MapRedcapFields
			parsedXML={parsedXML}
			onSubmit={handleMapRedcapFields}
			onCancel={handleCancel}
		/>,
		<>{'Component 3'}</>
	]

	const title = (
		<div className='block flex justify-between items-center w-full'>
			<div className='block flex justify-between items-center gap-2'>
				<Image src='/icons/redcap.svg' width={28} height={28} alt={t('imageAlt')} />
				{t('title')}
			</div>

			<div>
				{currentStep + 1} {'/'} {multiStepComponents.length}
			</div>
		</div>
	)

	return (
		<div className={className} data-testid={testId}>
			<MultiStepForm
				inProgress={inProgress}
				title={title}
				currentStep={currentStep}
				// header={parsedXML ? <XmlPreview className={'mb-4'} xmlParsed={parsedXML} /> : undefined}
				steps={multiStepComponents}
				name={UPLOAD_REDCAP_XML_FORM_NAME}
			/>
		</div>
	)
}
