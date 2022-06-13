import { ButtonProps } from './Button.types'

export const Button = ({ children, className, onClick, testId = 'Button' }: ButtonProps) => {
	return (
		<button data-testid={testId} className={`btn normal-case ${className}`} onClick={onClick}>
			{children}
		</button>
	)
}
