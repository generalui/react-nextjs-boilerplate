import { ButtonProps } from './Button.types'

export const Button = ({ children, className, onClick }: ButtonProps) => {
	return (
		<button data-testid='Button' className={`btn ${className}`} onClick={onClick}>
			{children}
		</button>
	)
}
