const defaultStyles =
	'text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-4 py-2.5 focus:outline-none flex items-center gap-1'
const disabledBaseStyles = 'bg-gray-200 hover:bg-gray-200 focus:bg-gray-500'
const disabledWithBorderStyles = 'border border-gray-200'

export const imageInputVariants = {
	default: {
		container:
			'relative rounded-lg border border-gray-400 focus:border-2 focus:border-blue-600 focus:outline-2  focus:outline-gray-400 overflow-hidden flex flex-col items-center grow-0 w-full h-full h-40 w-40 lg:h-[200px] lg:w-[200px]',
		preview: 'block w-full h-full bg-cover bg-center absolute left-0 top-0'
	},
	rounded: {
		container:
			'relative rounded-lg overflow-hidden flex flex-col items-center grow-0 w-full h-full w-36 h-36 rounded-full lg:w-40 lg:h-40',
		preview: 'block w-full h-full bg-cover bg-center '
	}
}

export const disabledVariants = {
	defaultDisabled: `${defaultStyles} ${disabledWithBorderStyles} ${disabledBaseStyles} cursor-default`,
	roundedDisabled: `${defaultStyles} ${disabledWithBorderStyles} text-blue-600 border-gray-600 hover:bg-gray-600 focus:bg-gray-600`
}
