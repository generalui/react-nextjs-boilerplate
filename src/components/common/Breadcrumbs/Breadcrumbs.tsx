import cn from 'classnames'
import { useRouter } from 'next/router'
import { routeMap } from 'utils/client/routeMap'
import { useText } from 'hooks/useText'
import { BreadcrumbLink } from './BreadcrumbLink'
import { BreadcrumbsProps } from './Breadcrumbs.types'

export const Breadcrumbs = ({ className, testId = 'Breadcrumbs' }: BreadcrumbsProps) => {
	const { t } = useText()
	const { pathname, query } = useRouter()

	if (!pathname)
		return (
			<div
				className={cn(className, 'flex gap-2 lg:gap-6 xl:gap-7 items-center')}
				data-testid={testId}
			/>
		)

	const [, ...pathNameList] = pathname.split('/')
	const basePath = pathNameList[0]
	const route = routeMap[basePath]

	const getBreadCrumbDetails = (index: number) => {
		// Get label key from routeMap
		const isBasePath = index === 0
		const labelKey = (isBasePath ? route : route.subRoutes?.[pathNameList[index]])?.labelKey

		if (!labelKey && index === 0) throw Error('No label key found for route')

		// Ensure a label key has been assigned
		if (index > 0 && !route.subRoutes) {
			throw Error('Routes using breadcrumbs should include subRoutes in the routeMap config')
		}

		if (!labelKey) return null

		// Get href from current url
		let href = (isBasePath ? route : route.subRoutes?.[pathNameList[index]])?.href || ''

		if (!href) {
			for (let i = 0; i <= Math.min(index, pathNameList.length - 1); i++) {
				href += pathNameList[i].includes('[')
					? `/${query[pathNameList[i].slice(1, -1)]}`
					: `/${pathNameList[i]}`
			}
		}
		return { href, labelKey }
	}

	return (
		<div
			className={cn(className, 'flex gap-2 lg:gap-6 xl:gap-7 items-center')}
			data-testid={testId}
		>
			{pathNameList.map((_path, i) => {
				const details = getBreadCrumbDetails(i)

				if (!details) return null

				const { href, labelKey } = details

				return (
					<BreadcrumbLink
						key={labelKey}
						href={href}
						label={t(labelKey)}
						includeChevron={!!i}
						disabled={i === pathNameList.length - 1}
					/>
				)
			})}
		</div>
	)
}
