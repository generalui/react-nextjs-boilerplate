import cn from 'classnames'
import { Text } from 'common/Text'
import { DetailProps } from './Detail.types'

const Placeholder = () => (
	<div className='bg-gray-50 text-gray-400 text-sm rounded px-4 py-2 flex-grow min-h-[36px] block' />
)
// min-h-[36px] added to compensate for empty state
export const Detail = ({
	children,
	className,
	label,
	textColor = 'text-gray-400',
	testId = 'Detail'
}: DetailProps) => (
	<div className={cn('flex flex-col w-full gap-2', className)} data-testid={testId}>
		{label && (
			<Text v='subtitle' className='font-semibold'>
				{label}
			</Text>
		)}
		{children ? (
			typeof children === 'string' ? (
				<Text
					className={cn(
						'bg-gray-50text-sm rounded px-4 py-2 flex-grow min-h-[36px] block text',
						textColor
					)}
				>
					{children}
				</Text>
			) : (
				children
			)
		) : (
			<Placeholder />
		)}
	</div>
)
