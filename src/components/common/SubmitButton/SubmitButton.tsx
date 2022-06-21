import { useText } from 'hooks/useText'
import { Button } from 'common/Button'
import { Spinner } from 'common/Spinner'
import { SubmitButtonProps } from './SubmitButton.types'

const DefaultLoadingLabel = () => {
	const { t } = useText('common.submitButton')

	return (
		<div className='flex items-center justify-center'>
			<Spinner className='h-6 w-6' />
			{t('loading')}
		</div>
	)
}
export const SubmitButton = ({
	children,
	className,
	testId = 'SubmitButton',
	isError,
	isLoading,
	isSuccess,
	loadingLabel,
	successLabel,
	errorLabel,
	disableOnLoading = false,
	...props
}: SubmitButtonProps) => {
	const { t } = useText('common.submitButton')
	loadingLabel = loadingLabel || <DefaultLoadingLabel />
	successLabel = successLabel || t('success')
	errorLabel = errorLabel || t('error')

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
