import * as HIcons from '@heroicons/react/solid'
import * as InternalIcons from 'public/icons'
import { CommonProps } from 'types/CommonProps'
import { iconVariants } from 'common/Icon/variants'

export interface IconProps extends CommonProps {
	icon: keyof typeof HIcons | keyof typeof InternalIcons
	outlined?: boolean
	size?: keyof typeof iconVariants
}
