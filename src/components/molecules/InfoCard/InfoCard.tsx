import { FC } from 'react'
import { CardBody } from 'components/atoms/CardBody/CardBody'
import { CardContainer } from 'components/atoms/CardContainer/CardContainer'

export interface CardData {
	href: string
	title: string
	text: string
}

type Partial<T> = {
	[P in keyof T]?: T[P]
}

const InfoCard: FC<Partial<CardData>> = ({
	href = '/',
	title = 'Home',
	text = 'Go to home page'
}) => {
	return (
		<CardContainer>
			<CardBody href={href}>
				<h2>{title} &rarr;</h2>
				<p>{text}.</p>
			</CardBody>
		</CardContainer>
	)
}

export default InfoCard
