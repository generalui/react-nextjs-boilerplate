const defaultStyles =
	'text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-4 py-2.5 focus:outline-none flex items-center gap-1'
const disabledBaseStyles = 'bg-gray-500 hover:bg-gray-500 focus:bg-gray-500'
const disabledWithBorderStyles = 'border border-gray-500'

export const buttonVariants = {
	default: `${defaultStyles} border border-blue-600`,
	secondary: `${defaultStyles} border border-blue-600 text-blue-600 bg-blue-200 hover:bg-blue-100`,
	sm: `${defaultStyles} text-sm px-4 py-2`,
	transparent: `${defaultStyles} bg-transparent hover:bg-gray-100 text-black font-normal py-2`
}

export const disabledVariants = {
	defaultDisabled: `${defaultStyles} ${disabledWithBorderStyles} ${disabledBaseStyles}`,
	secondaryDisabled: `${defaultStyles} ${disabledWithBorderStyles} text-blue-600 'bg-gray-600 hover:bg-gray-600 focus:bg-gray-600`,
	smDisabled: `${defaultStyles}  ${disabledBaseStyles}`,
	transparentDisabled: `${defaultStyles}  bg-transparent hover: bg-transparent text-gray-500 font-normal py-2`
}
