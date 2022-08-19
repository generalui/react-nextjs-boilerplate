import cn from 'classnames'
import Image from 'next/image'
import { CardProps } from './Card.types'
import { HeaderIcon } from './common/HeaderIcon'

export const Card = ({
	action,
	children,
	className,
	headerClassName,
	iconProps,
	img,
	imgAlt,
	testId = 'Card',
	title,
	titleClassName
}: CardProps) => (
	<div data-testid={testId} className={cn('bg-white p-4 rounded-lg', className)}>
		{img && (
			<figure className='w-full lg:w-1/4 relative h-60 lg:h-48'>
				<Image layout='fill' src={img} alt={imgAlt} />
			</figure>
		)}
		{(title || action || iconProps) && (
			<div className={cn('flex justify-between mb-4', headerClassName)}>
				<div className={'flex items-center gap-3'}>
					{iconProps?.icon && <HeaderIcon {...iconProps} size='sm' />}
					{title && (
						<h2 className={cn('font-semibold text-2xl flex gap-2 items-center', titleClassName)}>
							{title}
						</h2>
					)}
				</div>
				{action}
			</div>
		)}
		{children}
	</div>
)
