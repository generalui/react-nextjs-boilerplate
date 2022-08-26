import cn from 'classnames'
import { useText } from 'hooks/useText'
import { Form } from 'partials/Form'
import { ActionButtons } from 'common/ActionButtons'
import { Card } from 'common/Card'
import { JsonViewer } from 'common/JsonViewer'
import { Text } from 'common/Text'
import { DataSummaryInput, DataSummaryProps } from './DataSummary.types'

type DataSummaryInterface = {
	dataClassName: string
	value: number
	dataType: string
}

export const DataSummary = function DataSummary({
	onSubmit,
	testId = 'DataSummary',
	title,
	onCancel,
	consents,
	unMappedFields,
	participantList
}: DataSummaryProps) {
	const { t } = useText('studies.addParticipants.form.dataSummary')
	const dataSummary: DataSummaryInterface[] = [
		{
			dataClassName: 'text-accent-1',
			value: participantList.length,
			dataType: 'participants'
		},
		{
			dataClassName: 'text-accent-2',
			value: consents,
			dataType: 'consents'
		},
		{
			dataClassName: 'text-accent-3',
			value: unMappedFields,
			dataType: 'unmappedFields'
		}
	]

	const handleSubmit = (values: DataSummaryInput) => {
		onSubmit?.(values)
	}

	return (
		<div className='flex flex-col gap-6' data-testid={testId}>
			<Card className='flex flex-col gap-6' title={title}>
				<Text v='h2'>{t('subtitle')}</Text>
				<Text>{t('description')}</Text>

				<Form
					onSubmit={handleSubmit}
					render={({ handleSubmit }) => (
						<form onSubmit={handleSubmit} className='flex flex-col gap-8'>
							{/* Data summary section */}
							<div className='flex flex-col md:flex-row gap-6'>
								{dataSummary.map(({ dataClassName, value, dataType }) => (
									<div
										key={dataType}
										className='bg-gray-50 text-sm rounded px-4 py-2 flex-grow min-h-[36px] flex flex-col justify-center items-center'
									>
										<Text className='font-semibold text-2xl flex gap-2 items-center'>
											{t(`aggregatedData.${dataType}`)}
										</Text>
										<Text v='h2' className={cn('font-bold text-5xl', dataClassName)}>
											{value}
										</Text>
									</div>
								))}
							</div>

							{/* Preview Data */}
							<JsonViewer data={participantList} />

							<ActionButtons
								submitText={t('submit')}
								cancelText={t('cancel')}
								onCancel={onCancel}
							/>
						</form>
					)}
				/>
			</Card>
		</div>
	)
}
