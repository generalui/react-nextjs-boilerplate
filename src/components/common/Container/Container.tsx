import cn from 'classnames'
import { ContainerProps } from './Container.types'

export const Container = ({ children, className, testId = 'Container', fluid }: ContainerProps) => {
	return (
		<div
			data-testid={testId}
			className={cn('container mx-auto', !fluid && 'p-3 md:px-12 md:py-0', className)}
		>
			{children}
		</div>
	)
}
