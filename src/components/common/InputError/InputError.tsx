import cn from 'classnames'
import { InputErrorProps } from './InputError.types'

export const InputError = ({ errors, className, testId = 'InputError' }: InputErrorProps) => (
	<div className={cn('flex flex-col gap-2', className)} data-testid={testId}>
		{errors &&
			errors.map((error) =>
				error ? (
					<span key={error} className='text-xs text-red-500'>
						{'*'} {error}
					</span>
				) : null
			)}
	</div>
)
