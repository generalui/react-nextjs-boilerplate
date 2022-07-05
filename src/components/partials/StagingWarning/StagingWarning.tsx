import cn from 'classnames'
import { useText } from 'hooks/useText'
import { Card } from 'common/Card'
import { StagingWarningProps } from './StagingWarning.types'

export const StagingWarning = ({ className, testId = 'StagingWarning' }: StagingWarningProps) => {
	const { t } = useText('signIn.stagingWarning')

	if (process.env.NEXT_PUBLIC_ENV !== 'staging') return null

	return (
		<Card
			titleClassName='text-center'
			title={t('title')}
			className={cn('md:max-w-xl mx-auto p-6 md:shadow-md border-2 border-red-400', className)}
			testId={testId}
		>
			{t('description')}
		</Card>
	)
}
