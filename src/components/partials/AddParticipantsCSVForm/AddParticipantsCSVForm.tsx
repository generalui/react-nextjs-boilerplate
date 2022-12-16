/* eslint-disable react/jsx-key */
import { useState } from 'react'
import { ParticipantSchema, UploadCSVInput } from 'types/index'
import { useAddParticipantsToStudy } from 'hooks/api/studies/useAddParticipantsToStudy'
import { useParseCSV } from 'hooks/useParseCSV'
import { useRouter } from 'hooks/useRouter'
import { useText } from 'hooks/useText'
import { MultiStepForm } from 'partials/MultiStepForm'
import { Icon } from 'common/Icon'
import { AddParticipantsCSVFormProps } from './AddParticipantsCSVForm.types'
import { DataSummary } from './steps/DataSummary'
import { MapFields } from './steps/MapFields'
import { CSV_DATA_FIELDS, MapFieldsInput } from './steps/MapFields/MapFields.types'
import { UploadCSV } from './steps/UploadCSV'

const UPLOAD_REDCAP_XML_FORM_NAME = 'upload-redcap-xml-form'

export const AddParticipantsCSVForm = ({
	className,
	testId = 'AddParticipantsCSVForm',
	studyId
}: AddParticipantsCSVFormProps) => {
	const { parse, parsedCSV, fields } = useParseCSV()
	const [currentStep, setCurrentStep] = useState<number>(0)
	const [participantList, setParticipantList] = useState<Record<string, unknown>[]>([])
	const [unMappedFields, setUnMappedFields] = useState<number>(0)
	const [mappedFields, setMappedFields] = useState<number>(0)
	const [inProgress, setInProgress] = useState<boolean>()
	const { t } = useText('studies.addParticipants.form')

	const { mutate, data } = useAddParticipantsToStudy({
		studyId
	})

	const { forceBack } = useRouter()

	const handleCancel = () => {
		forceBack()
	}

	const handleUploadCSV = (values: UploadCSVInput) => {
		parse(values.csvFile[0])
		setCurrentStep(currentStep + 1)
		setInProgress(true)
	}

	const handleImportParticipants = () => {
		const transformedParticipantList = participantList.map((participant) =>
			ParticipantSchema.parse(participant)
		) // transform

		if (studyId) {
			mutate({
				studyId,
				participants: transformedParticipantList
			})
		}
	}

	const handleMapCSVFields = (values: MapFieldsInput) => {
		const fieldKeys = (Object.keys(values) as Array<keyof typeof values>).map((key) => ({
			field: key,
			csvField: values[key]?.value
		}))

		// Pick relevant client data from csv list
		const clientDataNext =
			parsedCSV?.map((client) => {
				const ret_value: Record<string, unknown> = {}

				fieldKeys.forEach((key) => {
					ret_value[key.field] = client[key.csvField as string]
				})

				return ret_value
			}) || []

		setUnMappedFields(CSV_DATA_FIELDS.length - fieldKeys.length)
		setMappedFields(fieldKeys.length)
		setParticipantList(clientDataNext)
		setCurrentStep(currentStep + 1)
	}

	const multiStepComponents = [
		<UploadCSV onSubmit={handleUploadCSV} onCancel={handleCancel} />,
		<MapFields fields={fields} onSubmit={handleMapCSVFields} onCancel={handleCancel} />,
		<DataSummary
			fields={fields}
			onSubmit={handleImportParticipants}
			onCancel={() => setCurrentStep(1)}
			participantList={participantList}
			unMappedFields={unMappedFields}
			mappedFields={mappedFields}
			newParticipants={data}
		/>
	]

	const title = (
		<div className='flex justify-between items-center w-full'>
			<div className='flex justify-between items-center gap-2'>
				<Icon icon='DocumentIcon' />
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
				steps={multiStepComponents}
				name={UPLOAD_REDCAP_XML_FORM_NAME}
			/>
		</div>
	)
}
