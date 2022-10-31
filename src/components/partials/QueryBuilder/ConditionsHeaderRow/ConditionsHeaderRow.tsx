import { useText } from 'hooks/useText'
import { Text } from 'common/Text'
import { ConditionsHeaderRowProps } from './ConditionsHeaderRow.types'

export const ConditionsHeaderRow = ({
	className,
	testId = 'ConditionsHeaderRow'
}: ConditionsHeaderRowProps) => {
	const { t } = useText('queryBuilder.filters')

	return (
		<div className={className} data-testid={testId}>
			<div className='grid grid-cols-8 gap-4 items-center pt-4'>
				<div className='flex flex-col gap-3 col-span-7 md:col-span-1'>
					<Text size='xs' className='text-gray-500 font-semibold'>
						{t('filterType')}
					</Text>
				</div>
				<div className='flex flex-col gap-3 col-span-7 md:col-span-3'>
					<Text size='xs' className='text-gray-500 font-semibold'>
						{t('fields')}
					</Text>
				</div>
				<div className='flex flex-col gap-3 col-span-7 md:col-span-2'>
					<Text size='xs' className='text-gray-500 font-semibold'>
						{t('condition')}
					</Text>
				</div>
				<div className='flex flex-col gap-3 col-span-7 md:col-span-2'>
					<Text size='xs' className='text-gray-500 font-semibold'>
						{t('value')}
					</Text>
				</div>
			</div>
		</div>
	)
}
