import { CommonProps } from 'types/CommonProps'

export interface OrderedListProps extends CommonProps {
	list: { step: number; text: string; className?: string }[]
}
