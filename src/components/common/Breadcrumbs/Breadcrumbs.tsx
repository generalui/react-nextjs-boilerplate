import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { routeMap } from 'utils/navigation'
import { useText } from 'hooks/useText'
import { Icon } from 'common/Icon'
import { Text } from 'common/Text'
import { BreadcrumbsProps } from './Breadcrumbs.types'

export const Breadcrumbs = ({ className, testId = 'Breadcrumbs' }: BreadcrumbsProps) => {
	const { t } = useText()
	const router = useRouter()
	const routeParts = router.route.split('/')

	if (routeParts.length <= 2) {
		return null
	}

	const baseRoute = '/' + routeParts[1]
	const endRoute = routeParts[-1]

	const route = routeMap[baseRoute]
	const childRoute = route.subRoutes[endRoute] || route.subRoutes.default

	return (
		<div className={cn(className, 'flex gap-8 items-center')} data-testid={testId}>
			<Link href={baseRoute} passHref>
				<Text className='font-bold'>{t(route.labelKey)}</Text>
			</Link>
			<Icon icon='ChevronRightIcon' className='text-gray-400' />
			<Text className='font-bold text-gray-400'>{t(childRoute.labelKey)}</Text>
		</div>
	)
}
