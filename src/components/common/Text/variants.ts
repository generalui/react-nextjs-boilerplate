import { TextProps } from 'common/Text/Text.types'

interface Variant {
	base: string
	size: TextProps['size']
}

export const textVariants: Record<string, Variant> = {
	default: { base: 'text-normal', size: 'base' },
	subtitle: { base: 'text-gray-500', size: 'xs' },
	h1: { base: 'text-normal', size: '3xl' },
	h2: { base: 'text-normal font-semibold', size: 'xl' },
	h3: { base: 'text-normal', size: 'lg' },
	h4: { base: 'text-normal', size: 'base' },
	h5: { base: 'text-normal', size: 'sm' }
}
