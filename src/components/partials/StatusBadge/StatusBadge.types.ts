import { CommonProps } from 'types/CommonProps'

export interface StatusBadgeProps extends CommonProps {
	size?: 'sm' | 'md'
	v: 'new' | 'approved' | 'archived'
}
