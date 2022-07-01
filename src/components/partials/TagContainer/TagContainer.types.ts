import { CommonProps } from 'types/CommonProps'
import { IconProps } from 'common/Icon/Icon.types'

export interface TagContainerProps extends CommonProps {
	tags: { icon?: IconProps['icon'] | string; label: string }[]
}
