import cn from 'classnames'
import { InputErrorProps } from './InputError.types'

export const InputError = ({ errors, className, testId = 'InputError' }: InputErrorProps) => {
	return (
		<div
			className={cn('flex flex-col gap-2 mt-5 absolute bottom-[-1.5rem] left-0', className)}
			data-testid={testId}
		>
			{errors &&
				errors.map((error) => (
					<span key={error} className='text-xs text-red-500'>
						{'*'} {error}
					</span>
				))}
		</div>
	)
}
