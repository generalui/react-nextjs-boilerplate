import { NextRouter, useRouter as _useRouter } from 'next/router'

type UseRouter = () => NextRouter & {
	forceBack: () => void
}

export const useRouter: UseRouter = () => {
	const router = _useRouter()

	/**
	 * Direct the browser to the same path without the last child
	 */
	const forceBack = () => {
		const { asPath, push } = router

		const lastSlash = asPath.lastIndexOf('/')
		const path = asPath.substring(0, lastSlash)

		push(path)
	}

	return { ...router, forceBack }
}
