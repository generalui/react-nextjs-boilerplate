import cn from 'classnames'
import { usePagination } from 'hooks/usePagination'
import { useText } from 'hooks/useText'
import { PaginationProps } from './Pagination.types'
import { PaginationItem } from './PaginationItem'

export const Pagination = ({
	onChange,
	className,
	testId = 'Pagination',
	pageSize = 20,
	initialPage = 1,
	totalCount,
	visibleCount,
	name,
	showDetails = true
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
		setPage?.(selectedPage)
	}

	const currentSkip = ((page ? page : 1) - 1) * pageSize
	const through = currentSkip + (visibleCount || 0)

	if (!totalCount || totalCount < pageSize) return null

	return (
		<nav
			className={cn(
				'flex flex-col space-y-4 items-center justify-between max-w-lg m-auto',
				className
			)}
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

			{showDetails && (
				<div className='flex items-center space-x-4 text-sm text-gray-500'>
					{t('details', [currentSkip, through, totalCount])}
				</div>
			)}
		</nav>
	)
}
