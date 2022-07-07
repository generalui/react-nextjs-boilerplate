import Router from 'next/router'

export const setRouterQuery = (query?: Record<string, string | string[] | undefined>) => {
	Router.push(
		{
			query
		},
		undefined,
		{ shallow: true }
	)
}
