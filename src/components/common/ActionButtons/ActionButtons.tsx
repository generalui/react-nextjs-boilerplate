import cn from 'classnames'
import { useText } from 'hooks/useText'
import { Button } from 'common/Button'
import { SubmitButton } from 'common/SubmitButton'
import { ActionButtonsProps } from './ActionButtons.types'

export const ActionButtons = ({
	className,
	localizationScope,
	submitText,
	cancelText,
	testId = 'ActionButtons'
}: ActionButtonsProps) => {
	const { t } = useText(localizationScope)

	return (
		<div
			className={cn(
				'flex items-center pt-6 gap-4 rounded-b border-t border-gray-200 dark:border-gray-600',
				className
			)}
			data-testid={testId}
		>
			<SubmitButton className='w-full justify-center md:justify-start md:w-auto' disableOnLoading>
				{submitText ? submitText : t('submit')}
			</SubmitButton>
			<Button v='secondary' className='w-full justify-center md:justify-start md:w-auto'>
				{cancelText ? cancelText : t('cancel')}
			</Button>
		</div>
	)
}
