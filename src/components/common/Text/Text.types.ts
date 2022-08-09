import { CommonProps } from 'types/CommonProps'
import { textVariants } from './Text.variants'

export interface TextProps extends CommonProps {
	href?: string
	size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'
	v?: keyof typeof textVariants
}
