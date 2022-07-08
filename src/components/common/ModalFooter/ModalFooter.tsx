import cn from 'classnames'
import { ModalFooterProps } from './ModalFooter.types'

export const ModalFooter = ({ children, className, testId = 'ModalFooter' }: ModalFooterProps) => {
	return (
		<div
			className={cn(
				'flex items-center pt-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600',
				className
			)}
			data-testid={testId}
		>
			{children}
		</div>
	)
}
