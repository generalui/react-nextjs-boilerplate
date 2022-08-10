import * as HIcons from '@heroicons/react/solid'
import { CommonProps } from 'types/CommonProps'
import * as InternalIcons from 'common/Icon/iconMap'
import { iconVariants } from 'common/Icon/variants'

export interface IconProps extends CommonProps {
	icon: keyof typeof HIcons | keyof typeof InternalIcons
	outlined?: boolean
	size?: keyof typeof iconVariants
}
