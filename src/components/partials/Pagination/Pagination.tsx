import cn from 'classnames'
import { useText } from 'hooks/useText'
import { PaginationProps } from './Pagination.types'
import { PaginationItem } from './PaginationItem'

export const Pagination = ({ children, className, testId = 'Pagination' }: PaginationProps) => {
	const { t } = useText('common.pagination')

	return (
		<nav className={cn('nav', className)} data-testid={testId} aria-label={t('ariaLabel')}>
			<ul className='inline-flex -space-x-px'>
				<PaginationItem>{t('previous')}</PaginationItem>
			</ul>
			{children}
		</nav>
	)
}
