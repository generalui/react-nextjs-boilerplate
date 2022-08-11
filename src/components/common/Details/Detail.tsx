import cn from 'classnames'
import { Text } from 'common/Text'
import { DetailProps } from './Details.types'

export const Detail = ({ className, testId = 'Detail', title, value }: DetailProps) => {
	return (
		<div className={cn('flex', className)} data-testid={testId}>
			<Text className='w-2/5 truncate font-semibold text-gray-500' size='sm'>
				{title}
			</Text>
			<Text className='w-3/5' v='subtitle' size='sm'>
				{value}
			</Text>
		</div>
	)
}
