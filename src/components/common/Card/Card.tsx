import cn from 'classnames'
import Image from 'next/image'
import { CardProps } from './Card.types'

export const Card = ({ className, children, title, img, imgAlt }: CardProps) => {
	return (
		<div
			data-testid='Card'
			className={cn('card bg-base-100 md:shadow-xl  rounded-none	md:rounded-lg	', className)}
		>
			{img && (
				<figure className='w-full lg:w-1/4 relative h-60 lg:h-48'>
					<Image layout='fill' src={img} alt={imgAlt} />
				</figure>
			)}
			{title && <h2 className='card-title'>{title}</h2>}
			{children && <div className='card-body'>{children}</div>}
		</div>
	)
}