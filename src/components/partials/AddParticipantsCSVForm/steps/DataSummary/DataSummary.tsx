import cn from 'classnames'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useText } from 'hooks/useText'
import { Form } from 'partials/Form'
import { ActionButtons } from 'common/ActionButtons'
import { Button } from 'common/Button'
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
	unMappedFields,
	mappedFields,
	participantList,
	newParticipants,
	studyId
}: DataSummaryProps) {
	const { t } = useText('studies.addParticipants.form.dataSummary')
	const [formSubmitted, setFormSubmitted] = useState(false)
	const { push } = useRouter()
	const dataSummary: DataSummaryInterface[] = [
		{
			dataClassName: 'text-accent-1',
			value: participantList.length,
			dataType: 'participants'
		},
		{
			dataClassName: 'text-accent-2',
			value: mappedFields,
			dataType: 'mappedFields'
		},
		{
			dataClassName: 'text-accent-3',
			value: unMappedFields,
			dataType: 'unmappedFields'
		}
	]

	const handleSubmit = (values: DataSummaryInput) => {
		onSubmit?.(values)
		setFormSubmitted(true)
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
							{/* Show Participant Info */}
							{newParticipants && (
								<div>
									<Text v='h2' className='font-bold'>
										{t('participantInfo.description')}
									</Text>
									<Text className='pb-2'>{t('participantInfo.copyInformationMessage')}</Text>
									{newParticipants.map((participant) => {
										return (
											<div key={participant.user?.id} className='py-2'>
												<div className='flex'>
													<Text className='font-bold'>
														{`${t('participantInfo.email')}:`}&nbsp;
													</Text>
													<Text>{`${participant.user?.email}`}</Text>
												</div>
												<div className='flex'>
													<Text className='font-bold'>
														{`${t('participantInfo.password')}:`}&nbsp;
													</Text>
													<Text>{`${participant.password}`}</Text>
												</div>
											</div>
										)
									})}
								</div>
							)}

							{!formSubmitted ? (
								<ActionButtons
									submitText={t('submit')}
									cancelText={t('cancel')}
									onCancel={onCancel}
								/>
							) : (
								<Button onClick={() => push(`/studies/${studyId}`)}>{t('returnToStudy')}</Button>
							)}
						</form>
					)}
				/>
			</Card>
		</div>
	)
}
