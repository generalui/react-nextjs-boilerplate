import Router from 'next/router'

export const setRouterQuery = (query?: Record<string, string>) => {
	Router.push(
		{
			query
		},
		undefined,
		{ shallow: true }
	)
}
