import { NextRouter, useRouter } from 'next/router'
import Router from 'next/router'
import { useEffect, useState } from 'react'

export const setRouterQuery = (query?: Record<string, string | string[] | undefined>) => {
	Router.push(
		{
			query
		},
		undefined,
		{ shallow: true }
	)
}

export type QueryState = Partial<NextRouter['query']> | string | string[]

export type UserRouterQuery = <T = QueryState>(scope?: string) => T

/**
 * Hook to manage URL queries
 *
 * @returns
 */
export const useRouterQuery = (scope?: string) => {
	const { query: routerQuery } = useRouter()
	const [query, setQuery] = useState<QueryState>()

	useEffect(() => {
		if (scope) {
			const scopedQuery = routerQuery[scope]
			setQuery(scopedQuery)
		} else {
			setQuery(routerQuery)
		}
	}, [routerQuery, scope])

	/**
	 * Add query object to current url query
	 * Update based on Router Query NOT scoped query
	 * @param updateQuery
	 */
	const update = (updateQuery: Record<string, string>) => {
		// Spread the current query with the update
		setRouterQuery({ ...routerQuery, ...updateQuery })
	}

	/**
	 * Remove multiple or individual query
	 * Remove based on Router Query NOT scoped query
	 * @param removeQuery
	 */
	const remove = (removeQuery: Record<string, string> | string) => {
		// Clone the current query object
		const nextQuery = { ...routerQuery }

		if (typeof removeQuery === 'string') {
			// Remove single query
			delete nextQuery[removeQuery]
		} else {
			// Remove each element from the query object
			Object.keys(removeQuery).forEach((key) => {
				delete nextQuery[key]
			})
		}

		// Set the router query
		setRouterQuery(nextQuery)
	}

	return { query, update, remove }
}
