const baseContainerStyles = 'relative rounded-lg overflow-hidden flex flex-col grow-0 items-center'
const basePreviewStyles = 'block w-full h-full bg-cover bg-center'
const baseDisabledStyles = 'cursor-default'
const baseIconStyles = 'h-5 w-5 absolute bottom-3.5'

const defaultContainerStyles = `${baseContainerStyles} border border-gray-400 focus:border-2 focus:border-primary focus:outline-2  focus:outline-gray-400  h-40 w-40 lg:h-[200px] lg:w-[200px]`
const defaultPreviewStyles = `${basePreviewStyles} absolute left-0 top-0`
const defaultIconStyles = `${baseIconStyles} right-3.5`

const roundedContainerStyles = `${baseContainerStyles} items-center w-36 h-36 rounded-full lg:w-40 lg:h-40`
const roundedIconStyles = `${baseIconStyles} right-8`

export const imageInputVariants = {
	default: {
		container: defaultContainerStyles,
		preview: defaultPreviewStyles,
		icon: defaultIconStyles
	},
	rounded: {
		container: roundedContainerStyles,
		preview: basePreviewStyles,
		icon: roundedIconStyles
	}
}

export const disabledVariants = {
	defaultDisabled: {
		container: `${defaultContainerStyles} ${baseDisabledStyles}`,
		preview: defaultPreviewStyles,
		icon: defaultIconStyles
	},
	roundedDisabled: {
		container: `${roundedContainerStyles} ${baseDisabledStyles}`,
		preview: basePreviewStyles,
		icon: roundedIconStyles
	}
}
