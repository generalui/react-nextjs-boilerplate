import { TextProps } from 'common/Text/Text.types'

interface Variant {
	base: string
	size: TextProps['size']
}

export const textVariants: Record<string, Variant> = {
	default: { base: 'text-normal', size: 'base' },
	subtitle: { base: 'text-gray-500', size: 'xs' }
}
