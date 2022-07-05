import cn from 'classnames'
import Image from 'next/image'
import { CardProps } from './Card.types'

export const Card = ({
	className,
	titleClassName,
	children,
	title,
	img,
	imgAlt,
	testId = 'Card'
}: CardProps) => {
	return (
		<div data-testid={testId} className={cn('bg-white p-4 bg-base-100 rounded-lg', className)}>
			{img && (
				<figure className='w-full lg:w-1/4 relative h-60 lg:h-48'>
					<Image layout='fill' src={img} alt={imgAlt} />
				</figure>
			)}
			{title && <h2 className={cn('mb-4 font-bold text-3xl', titleClassName)}>{title}</h2>}
			{children}
		</div>
	)
}
