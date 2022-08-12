import cn from 'classnames'
import Link from 'next/link'
import { Icon } from 'common/Icon'
import { Text } from 'common/Text'
import { BreadcrumbLinkProps } from './BreadcrumbLink.types'

export const BreadcrumbLink = ({
	href,
	label,
	includeChevron,
	className,
	testId = 'BreadcrumbLink'
}: BreadcrumbLinkProps) => {
	return (
		<div className={cn('flex gap-8 items-center', className)} data-testid={testId}>
			{includeChevron && <Icon icon='ChevronRightIcon' className='text-gray-400' />}
			<Link href={href} passHref>
				<Text className='font-bold'>{label}</Text>
			</Link>
		</div>
	)
}
