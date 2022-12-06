/*!
 * ExportData Page
 */
import { useText } from 'hooks/useText'
import { Form } from 'partials/Form'
import { PageWrapper } from 'partials/PageWrapper'
import { Card } from 'common/Card'
import { SelectInput } from 'common/SelectInput'
import { SubmitButton } from 'common/SubmitButton'
import { Text } from 'common/Text'
import { ExportDataInput, ExportDataProps, ExportDataSchema } from './ExportData.types'

export const ExportData = function ExportData({ testId = 'ExportData' }: ExportDataProps) {
	const { t } = useText('exportData')
	const options = ['studies']

	const onSubmit = (values: ExportDataInput) => {
		try {
			ExportDataSchema.parse(values)
			console.log('🚀 ~ values', values)
		} catch (error) {
			return error
		}
	}

	return (
		<PageWrapper title={t('title')} testId={testId}>
			<Card
				iconProps={{ icon: 'DocumentArrowDownIcon' }}
				title={t('title')}
				headerClassName='pb-4 border-b mb-0'
			>
				<Form
					onSubmit={onSubmit}
					render={({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							{/* Export instructions text */}
							<div className='py-4'>
								<Text size='base'>{t('instructions')}</Text>
							</div>
							<div className='grid justify-items-stretch gap-x-8 gap-y-2'>
								<Text size='xs' className='text-gray-500 font-semibold'>
									{t('data')}
								</Text>
								<div className='grid grid-cols-6 gap-4'>
									<div className='col-span-5'>
										<SelectInput
											name='data'
											options={options.map((option) => {
												return {
													label: t(`options.${option}`),
													value: option
												}
											})}
										/>
									</div>
									<SubmitButton
										className='w-full justify-center md:justify-start md:w-auto'
										disableOnLoading
									>
										<div className='m-auto'>{t('buttons.submit')}</div>
									</SubmitButton>
								</div>
							</div>
						</form>
					)}
				/>
			</Card>
		</PageWrapper>
	)
}
