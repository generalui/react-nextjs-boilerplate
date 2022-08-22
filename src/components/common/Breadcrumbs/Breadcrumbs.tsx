import cn from 'classnames'
import { useRouter } from 'next/router'
import { routeMap } from 'utils/client/routeMap'
import { useText } from 'hooks/useText'
import { BreadcrumbLink } from './BreadcrumbLink'
import { BreadcrumbsProps } from './Breadcrumbs.types'

export const Breadcrumbs = ({ className, testId = 'Breadcrumbs' }: BreadcrumbsProps) => {
	const { t } = useText()
	const { asPath, pathname } = useRouter()

	if (!pathname)
		return (
			<div
				className={cn(className, 'flex gap-2 lg:gap-6 xl:gap-7 items-center')}
				data-testid={testId}
			/>
		)

	const [, ...pathList] = asPath.split('/')
	const [, ...pathNameList] = pathname.split('/')
	const basePath = pathList[0]
	const route = routeMap[basePath]

	const getBreadCrumbDetails = (index: number) => {
		// Get label key from routeMap
		const isBasePath = index === 0
		const labelKey = (isBasePath ? route : route.subRoutes?.[pathNameList[index]])?.labelKey

		if (!labelKey) throw Error('No label key found for route')

		// Ensure a label key has been assigned
		if (index > 0 && !route.subRoutes) {
			throw Error('Routes using breadcrumbs should include subRoutes in the routeMap config')
		}

		// Get href from current url
		let href = ''
		for (let i = 0; i <= Math.min(index, pathList.length - 1); i++) {
			href += `/${pathList[i]}`
		}

		return { href, labelKey }
	}

	return (
		<div
			className={cn(className, 'flex gap-2 lg:gap-6 xl:gap-7 items-center')}
			data-testid={testId}
		>
			{pathList.map((_path, i) => {
				const { href, labelKey } = getBreadCrumbDetails(i)

				return (
					<BreadcrumbLink
						key={href}
						href={href}
						label={t(labelKey)}
						includeChevron={!!i}
						disabled={i === pathList.length - 1}
					/>
				)
			})}
		</div>
	)
}
