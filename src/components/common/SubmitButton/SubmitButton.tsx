import { useText } from 'hooks/useText'
import { Button } from 'common/Button'
import { Spinner } from 'common/Spinner'
import { SubmitButtonProps } from './SubmitButton.types'

const DefaultLoadingLabel = () => {
	const { t } = useText('common.submitButton')

	return (
		<div className='flex items-center justify-center'>
			<Spinner className='h-3 w-3' />
			{t('loading')}
		</div>
	)
}
export const SubmitButton = ({
	children,
	className,
	testId = 'SubmitButton',
	isLoading,
	isSuccess,
	loadingLabel,
	successLabel,
	disableOnLoading = false,
	...props
}: SubmitButtonProps) => {
	const { t } = useText('common.submitButton')
	loadingLabel = loadingLabel || <DefaultLoadingLabel />
	successLabel = successLabel || t('success')

	return (
		<Button
			className={className}
			testId={testId}
			disabled={disableOnLoading && isLoading}
			type='submit'
			{...props}
		>
			{isLoading ? loadingLabel : isSuccess ? successLabel : children}
		</Button>
	)
}
