import { memo } from 'react'
import { ButtonProps } from './Button.types'

export const Button = memo(function Button({
	children,
	className,
	onClick,
	testId = 'Button'
}: ButtonProps) {
	return (
		<button data-testid={testId} className={`btn normal-case ${className}`} onClick={onClick}>
			{children}
		</button>
	)
})
