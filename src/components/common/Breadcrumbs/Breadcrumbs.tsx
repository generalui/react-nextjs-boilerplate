import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { routeMap } from 'utils/client/navigation'
import { useText } from 'hooks/useText'
import { Icon } from 'common/Icon'
import { Text } from 'common/Text'
import { BreadcrumbLink } from './BreadcrumbLink'
import { BreadcrumbsProps } from './Breadcrumbs.types'

export const Breadcrumbs = ({ className, testId = 'Breadcrumbs' }: BreadcrumbsProps) => {
	const { t } = useText()
	const router = useRouter()
	const routeParts = router.route.split('/')
	const lastIndex = routeParts.length - 1

	if (routeParts.length <= 2) {
		return null
	}

	const baseRoute = '/' + routeParts[1]
	const middleRoutes = routeParts.slice(2, lastIndex)
	const endRoute = routeParts[lastIndex]

	const route = routeMap[baseRoute]
	const childRoute = route.subRoutes[endRoute] || route.subRoutes.default

	return (
		<div className={cn(className, 'flex gap-8 items-center')} data-testid={testId}>
			<BreadcrumbLink href={baseRoute} label={t(route.labelKey)} />

			{middleRoutes.map((middleRoute) => {
				const index = middleRoutes.indexOf(middleRoute)

				let fullRoute = `${baseRoute}`
				middleRoutes.slice(0, index + 1).map((r) => {
					const value = r.includes('[') ? router.query[r.slice(1, r.length - 1)] : r
					fullRoute += `/${value}`
				})

				return (
					<BreadcrumbLink
						key={middleRoute}
						href={fullRoute}
						label={t(route.subRoutes[middleRoute].labelKey)}
						includeChevron
					/>
				)
			})}
			<Icon icon='ChevronRightIcon' className='text-gray-400' />
			<Text className='font-bold text-gray-400'>{t(childRoute.labelKey)}</Text>
		</div>
	)
}
