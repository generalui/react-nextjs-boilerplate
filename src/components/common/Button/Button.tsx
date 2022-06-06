import { memo } from 'react'
import { ButtonProps } from './Button.types'

export const Button = memo(function Button({ children, className, onClick }: ButtonProps) {
	return (
		<button data-testid='Button' className={`btn normal-case ${className}`} onClick={onClick}>
			{children}
		</button>
	)
})
