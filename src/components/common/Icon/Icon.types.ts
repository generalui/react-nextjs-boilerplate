import * as HIcons from '@heroicons/react/solid'
import { CommonProps } from 'types/CommonProps'

export interface IconProps extends CommonProps {
	icon: keyof typeof HIcons
	outlined?: boolean
	size?: number
}
