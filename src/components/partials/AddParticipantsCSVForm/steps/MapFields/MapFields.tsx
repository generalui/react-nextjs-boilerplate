import { useEffect, useState } from 'react'
import { handleValidate } from 'utils/client/handleValidate'
import { useText } from 'hooks/useText'
import { DataFieldSelect } from 'partials/DataFieldSelect'
import { Form } from 'partials/Form'
import { ActionButtons } from 'common/ActionButtons'
import { Card } from 'common/Card'
import { Detail } from 'common/Detail'
import { Icon } from 'common/Icon'
import { Text } from 'common/Text'
import { CSV_DATA_FIELDS, MapFieldsInput, MapFieldsProps, MapFieldsSchema } from './MapFields.types'

const transformFieldToOption = (fieldValue: string, field: string) => {
	return {
		label: fieldValue,
		value: fieldValue,
		meta: {
			field
		}
	}
}
export const MapFields = function MapFields({
	onSubmit,
	testId = 'MapFields',
	title,
	onCancel,
	fields
}: MapFieldsProps) {
	const { t } = useText('todos.addParticipants.form.parseRequiredData')
	const [fieldsToMap, setFieldsToMap] = useState<string[]>([])

	useEffect(() => {
		if (fields) setFieldsToMap(fields)
	}, [fields, setFieldsToMap])

	const handleSubmit = (values: MapFieldsInput) => {
		onSubmit?.(values)
	}

	const renderRedCapField = ({ name, required }: { name: string; required?: boolean }) => {
		const defaultValue: string | undefined = fieldsToMap.find((f) => f === name)

		return (
			<div className='grid grid-cols-12 gap-2 justify-between items-center' key={name}>
				<Detail className='col-span-12 md:col-span-5 w-100'>{name}</Detail>

				<div className='c qol-span-12 md:col-span-1 w-100 hidden md:flex justify-center'>
					<Icon icon='ArrowRightIcon' className='' />
				</div>

				<DataFieldSelect
					isClearable
					showError={false}
					className='col-span-12 md:col-span-6 w-100'
					placeholder={t(`inputPlaceholder.${required ? 'required' : 'optional'}`)}
					name={name}
					options={fieldsToMap.map((v) => transformFieldToOption(v, name))}
					defaultValue={defaultValue ? transformFieldToOption(defaultValue, name) : undefined}
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
					validate={(values) => handleValidate(values, MapFieldsSchema)}
					render={({ handleSubmit }) => (
						<form onSubmit={handleSubmit} className='flex flex-col gap-8'>
							<div className='flex flex-col gap-4'>{CSV_DATA_FIELDS.map(renderRedCapField)}</div>

							<ActionButtons submitText={t('submit')} onCancel={onCancel} />
						</form>
					)}
				/>
			</Card>
		</div>
	)
}
