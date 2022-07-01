import cn from 'classnames'
import Image from 'next/image'
import { Text } from 'common/Text'
import { TagProps } from './Tag.types'

export const Tag = ({ children, className, icon, testId = 'Tag' }: TagProps) => {
	return (
		<div
			className={cn(
				'bg-blue-100 text-blue-600 border border-blue-600 rounded p-1 flex gap-2 w-44',
				className
			)}
			data-testid={testId}
		>
			{icon && <Image src={icon} width='20' height='20' alt='Data type icon' />}
			<Text className='truncate'>{children}</Text>
		</div>
	)
}
