import cn from 'classnames'
import { ContainerProps } from './Container.types'

export const Container = ({ children, className, testId = 'Container' }: ContainerProps) => {
	return (
		<div data-testid={testId} className={cn('container mx-auto', className)}>
			{children}
		</div>
	)
}
