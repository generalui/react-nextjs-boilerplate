import cn from 'classnames'
import { Textarea as TA } from 'flowbite-react'
import { TextAreaProps } from './TextArea.types'

export const TextArea = ({ children, className, testId = 'TextArea' }: TextAreaProps) => {
	return (
		<div className={cn('block p-2.5 w-full text-sm', className)} data-testid={testId}>
			<TA placeholder='Leave a comment...' required={true} rows={4} />
		</div>
	)
}
