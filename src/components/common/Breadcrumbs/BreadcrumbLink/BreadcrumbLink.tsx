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
	disabled,
	testId = 'BreadcrumbLink'
}: BreadcrumbLinkProps) => {
	const innerText = (
		<Text
			className={cn(
				'font-bold flex gap-2 items-center justify-start',
				disabled ? 'text-gray-400' : 'hover:text-primary'
			)}
		>
			{includeChevron && <Icon icon='ChevronRightIcon' className='justify-start' />}
			{label}
		</Text>
	)

	return (
		<div
			className={cn(
				'flex gap-2 items-center',
				disabled ? 'text-gray-400' : 'cursor-pointer',
				className
			)}
			data-testid={testId}
		>
			{!disabled ? (
				<Link href={href} passHref>
					{innerText}
				</Link>
			) : (
				innerText
			)}
		</div>
	)
}
