/* eslint-disable react/jsx-key */
import Image from 'next/image'
import { useState } from 'react'
import { UploadCSVInput } from 'types/index'
import { useParseCSV } from 'hooks/useParseCSV'
import { useRouter } from 'hooks/useRouter'
import { useText } from 'hooks/useText'
import { MultiStepForm } from 'partials/MultiStepForm'
import { AddParticipantsCSVFormProps } from './AddParticipantsCSVForm.types'
import { MapFields } from './steps/MapFields'
import { MapFieldsInput } from './steps/MapFields/MapFields.types'
import { UploadCSV } from './steps/UploadCSV'

const UPLOAD_REDCAP_XML_FORM_NAME = 'upload-redcap-xml-form'

export const AddParticipantsCSVForm = ({
	className,
	testId = 'AddParticipantsCSVForm'
}: AddParticipantsCSVFormProps) => {
	const { parse, parsedCSV, fields } = useParseCSV()
	const [currentStep, setCurrentStep] = useState<number>(0)
	const [participantList, setParticipantList] = useState<Record<string, unknown>[]>()
	const [inProgress, setInProgress] = useState<boolean>()
	const { t } = useText('studies.addParticipants.form')
	const { forceBack } = useRouter()

	console.log('clientData', participantList)

	const handleCancel = () => {
		// Clean up
		forceBack()
	}

	const handleUploadCSV = (values: UploadCSVInput) => {
		parse(values.csvFile[0])
		setCurrentStep(currentStep + 1)
		setInProgress(true)
	}

	const handleMapCSVFields = (values: MapFieldsInput) => {
		console.log('handleMapCSVFields ~ mapCSVResults', values)
		const fieldKeys = (Object.keys(values) as Array<keyof typeof values>).map((key) => ({
			field: key,
			csvField: values[key]?.value
		}))

		// Pick relevant client data from csv list
		const clientDataNext = parsedCSV?.map((client) => {
			const ret_value: Record<string, unknown> = {}

			fieldKeys.forEach((key) => {
				ret_value[key.field] = client[key.csvField as string]
			})

			return ret_value
		})

		setParticipantList(clientDataNext)
		setCurrentStep(currentStep + 1)
	}

	const multiStepComponents = [
		<UploadCSV onSubmit={handleUploadCSV} onCancel={handleCancel} />,
		<MapFields fields={fields} onSubmit={handleMapCSVFields} onCancel={handleCancel} />,
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
				// header={parsedCSV ? <XmlPreview className={'mb-4'} xmlParsed={parsedCSV} /> : undefined}
				steps={multiStepComponents}
				name={UPLOAD_REDCAP_XML_FORM_NAME}
			/>
		</div>
	)
}
