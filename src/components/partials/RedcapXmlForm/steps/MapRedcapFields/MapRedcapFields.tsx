import Image from 'next/image'
import { useEffect, useState } from 'react'
import { UploadXmlSchema, XMLParsed, selectOptionsType } from 'types/index'
import { z } from 'zod'
import { getFromParsedXML } from 'utils/client/getFromParsedXML'
import { handleValidate } from 'utils/client/handleValidate'
import { useText } from 'hooks/useText'
import { DataFieldSelect } from 'partials/DataFieldSelect'
import { DocumentsInput } from 'partials/DocumentsInput'
import { Form } from 'partials/Form'
import { ActionButtons } from 'common/ActionButtons'
import { Card } from 'common/Card'
import { Detail } from 'common/Detail'
import { Icon } from 'common/Icon'
import { OrderedList } from 'common/OrderedList'
import { SelectInput } from 'common/SelectInput'
import { Text } from 'common/Text'
import { MapRedcapFieldsProps } from './MapRedcapFields.types'

const REDCAP_CONCENT_FIELDS = [
	'current_name',
	'gender',
	'maiden_name',
	'enrolled_tribe',
	'mailing_address',
	'physical_address',
	'home_phone_number',
	'work_phone number',
	'emergency_name',
	'emergency_phone',
	'emergency_address',
	'nearest_hospital_name',
	'nearest_hospital_address',
	'proof_of_consent',
	'withdrawal_procedures'
]

const REDCAP_CONCENT_FIELDS_OBJS = [
	{ name: 'current_name', required: true },
	{ name: 'gender', required: true },
	{ name: 'maiden_name', required: true },
	{ name: 'enrolled_tribe', required: true },
	{ name: 'mailing_address', required: true },
	{ name: 'physical_address', required: true },
	{ name: 'home_phone_number', required: true },
	{ name: 'work_phone number', required: true },
	{ name: 'emergency_name', required: true },
	{ name: 'emergency_phone', required: true },
	{ name: 'emergency_address', required: true },
	{ name: 'nearest_hospital_name', required: true },
	{ name: 'nearest_hospital_address', required: true },
	{ name: 'proof_of_consent', required: true },
	{ name: 'withdrawal_procedures', required: true }
]

// export const StudySchema = z.object(REDCAP_CONCENT_FIELDS.reduce((schema, field) => {
// 	const result
// }, {}))

// const getRedcapFieldsFromParsedXML = (parsedXML: XMLParsed) => {
// 	console.log('~ getRedcapFieldsFromParsedXML parsedXML', parsedXML)

// 	return parsedXML
// }

export const MapRedcapFields = function MapRedcapFields({
	onSubmit,
	testId = 'MapRedcapFields',
	title,
	parsedXML,
	onCancel
}: MapRedcapFieldsProps) {
	const { t } = useText('studies.redcapXMLForm.parseRequiredData')
	const [redCapFields, setRedcapFields] = useState<string[]>([])

	useEffect(() => {
		if (parsedXML?.fields) setRedcapFields(parsedXML.fields as string[])
	}, [parsedXML, setRedcapFields])

	const handleSubmit = (values: any) => {
		console.log('handleSubmit ~ values', values)
	}

	const renderRedCapField = (field: string) => {
		return (
			<div className='grid grid-cols-12 gap-2 justify-between items-center'>
				<Detail className='col-span-12 md:col-span-5 w-100'>{field}</Detail>

				<div className='col-span-12 md:col-span-1 w-100 hidden md:flex justify-center'>
					<Icon icon='ArrowRightIcon' className='' />
				</div>

				<DataFieldSelect
					className='col-span-12 md:col-span-6 w-100'
					placeholder={t('inputPlaceholder')}
					// labelClassName={labelClassName}
					// label={label}
					name={field}
					options={redCapFields.map((v) => ({ label: v, value: v }))}
					// components={{ Option }}
				/>
			</div>
		)
	}

	return (
		<div className='flex flex-col gap-6' data-testid={testId}>
			<Card className='flex flex-col gap-6' title={title}>
				<Text v='h2'>{t('subtitle')}</Text>
				<Text>{t('description')}</Text>

				<Form
					onSubmit={handleSubmit}
					validate={(values) => handleValidate(values, UploadXmlSchema)}
					render={({ handleSubmit }) => (
						<form onSubmit={handleSubmit} className='flex flex-col gap-8'>
							<div className='flex flex-col gap-4'>
								{REDCAP_CONCENT_FIELDS.map(renderRedCapField)}
							</div>

							<ActionButtons submitText={t('submit')} onCancel={onCancel} />
						</form>
					)}
				/>
			</Card>
		</div>
	)
}
