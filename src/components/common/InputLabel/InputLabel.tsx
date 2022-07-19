import cn from 'classnames'
import { InputLabelProps } from './InputLabel.types'

export const InputLabel = ({ className, testId = 'InputLabel', name, label }: InputLabelProps) => {
	if (!label) return null

	return (
		<label className={cn('text-xs text-gray-500', className)} data-testid={testId} htmlFor={name}>
			{label}
		</label>
	)
}
