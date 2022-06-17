import { Button } from 'common/Button'
import { Spinner } from 'common/Spinner'
import { SubmitButtonProps } from './SubmitButton.types'

export const SubmitButton = ({
	children,
	className,
	testId = 'SubmitButton',
	isError,
	isLoading,
	isSuccess,
	loadingLabel = (
		<div className='flex items-center justify-center'>
			<Spinner className='h-4 w-4' /> Loading...
		</div>
	),
	successLabel = 'Success!',
	errorLabel = 'Error!',
	disableOnLoading = false,
	...props
}: SubmitButtonProps) => {
	return (
		<Button
			className={className}
			testId={testId}
			disabled={disableOnLoading && isLoading}
			type='submit'
			{...props}
		>
			{isLoading ? loadingLabel : isSuccess ? successLabel : isError ? errorLabel : children}
		</Button>
	)
}
