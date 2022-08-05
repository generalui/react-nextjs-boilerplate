const defaultStyles =
	'text-button-text-primary bg-primary hover:bg-primary-hover focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-4 py-2.5 focus:outline-none flex items-center gap-1'
const disabledBaseStyles = 'bg-gray-200 hover:bg-gray-200 focus:bg-gray-500'
const disabledWithBorderStyles = 'border border-gray-200'

export const buttonVariants = {
	default: `${defaultStyles} border border-primary hover:border-primary-hover`,
	secondary: `${defaultStyles} border border-primary text-button-text-secondary bg-secondary hover:bg-secondary-hover hover:border-secondary-hover`,
	sm: `${defaultStyles} text-sm px-4 py-2`,
	transparent: `${defaultStyles} bg-transparent hover:bg-gray-100 text-black font-normal py-2`
}

export const disabledVariants = {
	defaultDisabled: `${defaultStyles} ${disabledWithBorderStyles} ${disabledBaseStyles}`,
	secondaryDisabled: `${defaultStyles} ${disabledWithBorderStyles} text-button-text-secondary border-gray-600 hover:bg-gray-600 focus:bg-gray-600`,
	smDisabled: `${defaultStyles}  ${disabledBaseStyles}`,
	transparentDisabled: `${defaultStyles}  bg-transparent hover: bg-transparent text-gray-500 font-normal py-2`
}
