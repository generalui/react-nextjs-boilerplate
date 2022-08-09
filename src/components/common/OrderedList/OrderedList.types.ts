import { CommonProps } from 'types/CommonProps'

export interface OrderedListProps extends CommonProps {
	list: { text: string; className?: string }[]
}
