import { useText } from 'hooks/useText'
import { Button } from 'common/Button'
import { Card } from 'common/Card'
import { SummaryProps } from './Summary.types'

export const Summary = ({ className, testId = 'Summary' }: SummaryProps) => {
	const { t } = useText('common.queryBuilder.summary')

	return (
		<div className={className} data-testid={testId}>
			<Card
				iconProps={{ icon: 'UserGroupIcon', wrapperClass: 'bg-green-400' }}
				title={t('title')}
				headerClassName='pb-4 border-b mb-0'
				action={<Button v='xs'>{t('export')}</Button>}
			></Card>
		</div>
	)
}
