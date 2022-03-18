import Link from 'next/link'
import { FC } from 'react'
import { CardContainer } from 'common/CardContainer'
import { CardLink } from 'common/CardLink'

export interface CardData {
	href: string
	title: string
	text: string
	blankTarget?: boolean
}

type Partial<T> = {
	[P in keyof T]?: T[P]
}

/**
 * This is an example component - not intended for production use
 */
export const InfoCard: FC<Partial<CardData>> = ({
	href = '/',
	title = 'Home',
	text = 'Go to home page',
	blankTarget
}) => {
	const cardLinkProps = blankTarget ? { rel: 'noreferrer', target: '_blank' } : {}
	return (
		<CardContainer>
			<Link href={href} passHref>
				<CardLink {...cardLinkProps}>
					<h2>{title} &rarr;</h2>
					<p>{text}.</p>
				</CardLink>
			</Link>
		</CardContainer>
	)
}
