const baseContainerStyles = 'relative rounded-lg overflow-hidden flex flex-col grow-0 items-center'
const basePreviewStyles = 'block w-full h-full bg-cover bg-center'
const baseDisabledStyles = 'cursor-default'
const baseIconWrapperStyles =
	'absolute bottom-2 p-2 bg-white bg-opacity-75 rounded-full flex align-items-center justify-center'

const defaultContainerStyles = `${baseContainerStyles} border border-gray-400 focus:border-2 focus:border-primary focus:outline-2  focus:outline-gray-400  h-40 w-40 lg:h-[200px] lg:w-[200px]`
const defaultPreviewStyles = `${basePreviewStyles} absolute left-0 top-0`
const defaultIconWrapperStyles = `${baseIconWrapperStyles} right-2`

const roundedContainerStyles = `${baseContainerStyles} items-center w-36 h-36 rounded-full lg:w-40 lg:h-40`
const roundedIconWrapperStyles = `${baseIconWrapperStyles} right-7`

export const imageInputVariants = {
	default: {
		container: defaultContainerStyles,
		preview: defaultPreviewStyles,
		iconWrapper: defaultIconWrapperStyles
	},
	rounded: {
		container: roundedContainerStyles,
		preview: basePreviewStyles,
		iconWrapper: roundedIconWrapperStyles
	}
}

export const disabledVariants = {
	defaultDisabled: {
		container: `${defaultContainerStyles} ${baseDisabledStyles}`,
		preview: defaultPreviewStyles,
		iconWrapper: defaultIconWrapperStyles
	},
	roundedDisabled: {
		container: `${roundedContainerStyles} ${baseDisabledStyles}`,
		preview: basePreviewStyles,
		iconWrapper: roundedIconWrapperStyles
	}
}
