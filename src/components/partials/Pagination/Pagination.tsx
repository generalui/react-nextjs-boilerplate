import cn from 'classnames'
import { usePagination } from 'hooks/usePagination'
import { useText } from 'hooks/useText'
import { PaginationProps } from './Pagination.types'
import { PaginationItem } from './PaginationItem'

export const Pagination = ({
	onChange,
	className,
	testId = 'Pagination',
	pageSize = 5,
	initialPage = 1,
	totalCount = 100,
	name
}: PaginationProps) => {
	const { t } = useText('common.pagination')
	const { page, setPage, pageRange, next, previous, totalPages } = usePagination({
		initialPage,
		pageSize,
		totalCount,
		name
	})

	const handlePageClick = (selectedPage: number) => {
		onChange?.(selectedPage)
		setPage(selectedPage)
	}

	return (
		<nav
			className={cn('flex justify-between max-w-lg m-auto', className)}
			data-testid={testId}
			aria-label={t('ariaLabel')}
		>
			<ul className='flex space-x-4'>
				<PaginationItem onClick={previous} className='rounded-lg' disabled={page === 1}>
					{t('previous')}
				</PaginationItem>

				<div className='inline-flex -space-x-px'>
					{pageRange?.map((currentPage, index) => {
						return (
							<PaginationItem
								onClick={() =>
									typeof currentPage === 'number' ? handlePageClick(currentPage) : null
								}
								className={cn(
									index === 0 && 'rounded-l-lg',
									index === pageRange.length - 1 && 'rounded-r-lg'
								)}
								active={currentPage === page}
								key={index.toString()}
							>
								{currentPage}
							</PaginationItem>
						)
					})}
				</div>
				<PaginationItem onClick={next} className='rounded-lg' disabled={page === totalPages}>
					{t('next')}
				</PaginationItem>
			</ul>
		</nav>
	)
}
