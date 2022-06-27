import { CommonProps } from 'types/CommonProps'
import { textVariants } from './Text.variants'

export interface TextProps extends CommonProps {
	href?: string
	v?: keyof typeof textVariants
}
