import cn from 'classnames'
import { ContainerProps } from './Container.types'

export const Container = ({ children, className, testId = 'Container', fluid }: ContainerProps) => {
	return (
		<div
			data-testid={testId}
			className={cn(
				'container mx-auto',
				!fluid && 'p-3 md:p-0 max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl xxl:max-w-7xl',
				className
			)}
		>
			{children}
		</div>
	)
}
