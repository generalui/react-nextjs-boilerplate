import { useEffect, useMemo, useState } from 'react'
import { getQueryNumber } from 'utils/getQueryNumber'
import { PaginationProps } from 'partials/Pagination/Pagination.types'
import { useRouterQuery } from './useRouterQuery'

export type UsePaginationPropsObjectType = PaginationProps & {
	siblingCount?: number
}
export type UsePaginationProps = UsePaginationPropsObjectType | string | undefined

export const DOTS = '...'

const range = (start: number, end: number) => {
	const length = end - start + 1
	/*
  	Create an array of certain length and set the elements within it from
    start value to end value.
  */
	return Array.from({ length }, (_, idx) => idx + start)
}

/**
 * Hook to manage pagination
 *
 * This hook can be passed nothing, a string, or an object of props
 *
 * Please see the example below
 *
 * @example
 * // URL query: ?page=1&documents-page=2
 *
 * const { page } = usePagination()
 * // page = 1
 *
 * const { page } = usePagination('documents')
 * // page = 2
 *
 * const { page } = usePagination('page')
 * // page = 1
 * // This is bad code and will add &page-page=1 to the url
 *
 * @param props
 * @returns
 */
export const usePagination = (props: UsePaginationProps) => {
	const {
		pageSize = 20,
		initialPage = 1,
		totalCount = 100,
		siblingCount = 1,
		name
	}: UsePaginationPropsObjectType = props
		? typeof props === 'string'
			? { name: props }
			: props
		: {}

	const [page, setPageState] = useState(initialPage)
	const queryName = useMemo(() => `${name ? `${name}-` : ''}page`, [name])
	const { query, update } = useRouterQuery(queryName)
	const totalPages = useMemo(() => Math.ceil(totalCount / pageSize), [totalCount, pageSize])

	// Check if page has been passed via URL query on page load
	useEffect(() => {
		if (query) {
			const queryValue = getQueryNumber(query)
			if (queryValue) {
				setPageState(queryValue)
			}
		}
	}, [query, setPageState, queryName])

	// Invoke when user click to request another page.
	const pageRange = useMemo(() => {
		const totalPageCount = Math.ceil(totalCount / pageSize)

		// Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
		const totalPageNumbers = siblingCount + 5

		/*
			Case 1:
				If the number of pages is less than the page numbers we want to show in our
				paginationComponent, we return the range [1..totalPageCount]
		*/
		if (totalPageNumbers >= totalPageCount) {
			return range(1, totalPageCount)
		}

		/*
			Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
		*/
		const leftSiblingIndex = Math.max(page - siblingCount, 1)
		const rightSiblingIndex = Math.min(page + siblingCount, totalPageCount)

		/*
			We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
		*/
		const shouldShowLeftDots = leftSiblingIndex > 2
		const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

		const firstPageIndex = 1
		const lastPageIndex = totalPageCount

		/*
			Case 2: No left dots to show, but rights dots to be shown
		*/
		if (!shouldShowLeftDots && shouldShowRightDots) {
			const leftItemCount = 3 + 2 * siblingCount
			const leftRange = range(1, leftItemCount)

			return [...leftRange, DOTS, totalPageCount]
		}

		/*
			Case 3: No right dots to show, but left dots to be shown
		*/
		if (shouldShowLeftDots && !shouldShowRightDots) {
			const rightItemCount = 3 + 2 * siblingCount
			const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)
			return [firstPageIndex, DOTS, ...rightRange]
		}

		/*
    	Case 4: Both left and right dots to be shown
    */
		if (shouldShowLeftDots && shouldShowRightDots) {
			const middleRange = range(leftSiblingIndex, rightSiblingIndex)
			return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
		}
	}, [totalCount, pageSize, siblingCount, page])

	/**
	 * Catch all to go to a specific page
	 * @param nextPage
	 */
	const setPage = (nextPage: string | number) => {
		// TODO: nextPage can probably just be number here
		// Validate that the next page is a number (this value is passed as a string from query)
		const nextPageNumber = getQueryNumber(nextPage)
		if (typeof nextPageNumber !== 'undefined') {
			// Update the router query
			update({ [queryName]: nextPageNumber.toString() })

			// Update the state
			setPageState(nextPageNumber)
		}
	}

	const next = () => {
		if (page < totalPages) {
			setPage(page + 1)
		}
	}

	const previous = () => {
		if (page > 1) {
			setPage(page - 1)
		}
	}

	if (typeof props === 'undefined' || typeof props === 'string') {
		return { page }
	}

	return { page, setPage, pageRange, next, previous, totalPages }
}
