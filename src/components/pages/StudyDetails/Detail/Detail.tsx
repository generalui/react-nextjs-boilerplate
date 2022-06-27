import cn from 'classnames'
import { Text } from 'common/Text'
import { DetailProps } from './Detail.types'

export const Detail = ({ children, className, label, testId = 'Detail' }: DetailProps) => (
	<div className={cn('flex flex-col w-full gap-2', className)} data-testid={testId}>
		<Text v='subtitle' className='font-semibold'>
			{label}
		</Text>
		{typeof children === 'string' ? (
			<Text className='bg-gray-50 text-gray-400 text-sm rounded px-4 py-2 flex-grow'>
				{children}
			</Text>
		) : (
			children
		)}
	</div>
)
