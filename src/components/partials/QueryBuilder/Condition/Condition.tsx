import { useText } from 'hooks/useText'
import { DropDownItem } from 'common/DropDown/DropDownItem'
// import { SelectInput } from 'common/SelectInput'
import { Text } from 'common/Text'
import { ConditionProps } from './Condition.types'

export const Condition = ({ className, testId = 'Condition' }: ConditionProps) => {
	const { t } = useText('participants.condition')

	const mainFields = ['study', 'dataTypes', 'contactInfo', 'metaData']
	const mainFields2 = mainFields.map((field) => t(`field.${field}.title`))
	console.log('mainFields2: ', mainFields2)

	const items = mainFields.map((field) => {
		return {
			label: <DropDownItem label={t(`field.${field}.title`)} value={t(`field.${field}.title`)} />,
			onClick: () => {
				return
			},
			value: t(`field.${field}.title`)
		}
	})
	console.log(items)

	return (
		<div className={className} data-testid={testId}>
			<div className='grid grid-rows-2 grid-flow-col gap-x-4'>
				<div className='row-start-2 bg-gray-100 w-24 h-11 flex items-center justify-center text-gray-900 rounded-md'>
					{t('where')}
				</div>
				<Text size='xs' className='text-gray1-500 font-semibold'>
					{t('field.title')}
				</Text>
				{/* <SelectInput /> */}
				<Text size='xs' className='text-gray-500 font-semibold'>
					{t('operator')}
				</Text>
				<div>{5}</div>
				<Text size='xs' className='text-gray-500 font-semibold'>
					{t('value')}
				</Text>
				<div>{7}</div>
				<div className='row-start-2'>{8}</div>
			</div>
		</div>
	)
}
