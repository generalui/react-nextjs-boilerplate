import * as HIcons from '@heroicons/react/solid'
import { CommonProps } from 'types/CommonProps'
import { iconVariants } from 'common/Icon/variants'

export interface IconProps extends CommonProps {
	icon: keyof typeof HIcons
	outlined?: boolean
	size?: keyof typeof iconVariants
}
