import cn from 'classnames'
import Image from 'next/image'
import { CardProps } from './Card.types'

export const Card = ({ className, children, title, img, imgAlt, testId = 'Card' }: CardProps) => {
	return (
		<div
			data-testid={testId}
			className={cn('bg-white p-4 bg-base-100 rounded-none	md:rounded-lg	', className)}
		>
			{img && (
				<figure className='w-full lg:w-1/4 relative h-60 lg:h-48'>
					<Image layout='fill' src={img} alt={imgAlt} />
				</figure>
			)}
			{title && <h1 className='mb-4 font-bold text-3xl'>{title}</h1>}
			{children}
		</div>
	)
}
