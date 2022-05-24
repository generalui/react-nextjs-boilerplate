import cn from 'classnames'
import { CardProps } from './Card.types'

export const Card = ({ className, children, title }: CardProps) => {
	return (
		<div data-testid='Card' className={cn('card bg-base-100 shadow-xl', className)}>
			{title && <h2 className='card-title'>{title}</h2>}
			{children && <div className='card-body'>{children}</div>}
		</div>
	)
}
