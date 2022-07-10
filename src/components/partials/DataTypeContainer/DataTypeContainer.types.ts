import { CommonProps } from 'types/CommonProps'
import { IconProps } from 'common/Icon/Icon.types'

export interface DataTypeContainerProps extends CommonProps {
	tags: { icon?: IconProps['icon'] | string; label: string; dataType: string }[]
}
