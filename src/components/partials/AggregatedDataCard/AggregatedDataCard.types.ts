import { ReactNode } from 'react'
import { CardProps } from 'common/Card/Card.types'

export interface AggregatedDataCardProps extends CardProps {
	description: ReactNode
	subTitle: ReactNode
	dataClassName?: string
	value?: ReactNode
}
