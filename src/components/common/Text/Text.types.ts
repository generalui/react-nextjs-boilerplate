import { CommonProps } from 'types/CommonProps'
import { textVariants } from './Text.variants'

export interface TextProps extends CommonProps {
	v?: keyof typeof textVariants
}
