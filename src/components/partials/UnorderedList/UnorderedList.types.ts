import { CommonProps } from 'types/CommonProps'

export interface UnorderedListProps extends CommonProps {
	list: { text: string; className?: string }[]
}
