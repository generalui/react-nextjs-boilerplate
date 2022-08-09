import { TextProps } from 'common/Text/Text.types'

interface Variant {
	variantClassName: string
	variantSize: TextProps['size']
}

export const textVariants: Record<string, Variant> = {
	default: { variantClassName: 'text-normal', variantSize: 'base' },
	subtitle: { variantClassName: 'text-gray-500', variantSize: 'xs' }
}
