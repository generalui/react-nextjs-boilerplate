const defaultStyles =
	'text-button-text-primary bg-primary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-4 py-2.5 focus:outline-none flex items-center gap-1'
const disabledBaseStyles = 'bg-gray-200 hover:bg-gray-200 focus:bg-gray-500'
const disabledWithBorderStyles = 'border border-gray-200'
const defaultToggleStyles =
	'py-2 px-4 text-sm font-medium bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10'
const selectedToggleStyles =
	'py-2 px-4 text-sm font-medium bg-primary text-white hover:bg-primary-hover focus:z-10'

export const buttonVariants = {
	default: `${defaultStyles} border border-primary hover:border-primary-hover hover:bg-primary-hover`,
	danger: `${defaultStyles} border border-danger text-button-text-primary bg-danger hover:bg-danger-hover hover:border-danger-hover`,
	secondary: `${defaultStyles} border border-primary text-button-text-secondary bg-secondary hover:bg-secondary-hover hover:border-secondary-hover`,
	secondaryOutlined: `${defaultStyles} bg-transparent border border-primary text-button-text-secondary hover:bg-secondary-hover hover:border-secondary-hover`,
	sm: `${defaultStyles} text-sm px-4 py-2 hover:border-primary-hover hover:bg-primary-hover`,
	xs: `${defaultStyles} text-sm px-3 py-1 hover:border-primary-hover hover:bg-primary-hover`,
	transparent: `${defaultStyles} bg-transparent hover:bg-gray-100 text-black font-normal py-2`,
	toggleLeft: `${defaultToggleStyles} rounded-l-lg`,
	toggleRight: `${defaultToggleStyles} rounded-r-md`,
	selectedToggleLeft: `${selectedToggleStyles} rounded-l-lg`,
	selectedToggleRight: `${selectedToggleStyles} rounded-r-md`
}

export const disabledVariants = {
	defaultDisabled: `${defaultStyles} ${disabledWithBorderStyles} ${disabledBaseStyles} border border-gray-200 hover:border-gray-200 hover:bg-gray-200`,
	dangerDisabled: `${defaultStyles} border border-danger text-button-text-secondary bg-secondary hover:bg-secondary-hover hover:border-secondary-hover`,
	secondaryDisabled: `${defaultStyles} ${disabledWithBorderStyles} text-button-text-secondary border-gray-600 hover:bg-gray-600 focus:bg-gray-600`,
	secondaryOutlinedDisabled: `${defaultStyles} ${disabledWithBorderStyles} text-button-text-secondary border-gray-600 hover:bg-gray-600 focus:bg-gray-600`,
	smDisabled: `${buttonVariants.sm}  ${disabledBaseStyles}`,
	xsDisabled: `${buttonVariants.xs} ${disabledBaseStyles}`,
	transparentDisabled: `${defaultStyles} bg-transparent hover:bg-transparent text-gray-500 font-normal py-2`,
	toggleLeftDisabled: `${defaultToggleStyles} ${disabledBaseStyles} rounded-l-lg`,
	toggleRightDisabled: `${defaultToggleStyles} ${disabledBaseStyles} rounded-l-lg`,
	selectedToggleLeftDisabled: `${selectedToggleStyles} ${disabledBaseStyles} rounded-l-lg`,
	selectedToggleRightDisabled: `${selectedToggleStyles} ${disabledBaseStyles} rounded-l-lg`
}
