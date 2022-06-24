import { CommonProps } from 'types/CommonProps'

export interface IconBadgeProps extends CommonProps {
	size?: 'sm' | 'md'
	v: 'new' | 'approved' | 'archived'
}
