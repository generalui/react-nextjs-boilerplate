import { LinkProps } from 'next/link'
import { CommonProps } from 'types/CommonProps'

export interface BreadcrumbLinkProps extends LinkProps, Omit<CommonProps, 'onClick'> {
	label: string
	includeChevron?: true
}
