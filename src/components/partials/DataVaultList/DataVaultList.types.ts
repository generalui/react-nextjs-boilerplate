import { CommonProps } from 'types/CommonProps'
import { CardProps } from 'common/Card/Card.types'

export interface DataVaultListProps extends CommonProps {
	action?: CardProps['action']
	iconProps?: CardProps['iconProps']
	studyId: string
	title: string
}
