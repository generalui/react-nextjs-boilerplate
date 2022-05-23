import cn from 'classnames'
import { ContainerProps } from './Container.types'

export const Container = ({ children, className }: ContainerProps) => {
	return (
		<div data-testid='Container' className={cn('container mx-auto', className)}>
			{children}
		</div>
	)
}
