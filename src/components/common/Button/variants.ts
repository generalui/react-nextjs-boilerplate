const defaultStyles =
	'text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-4 py-2.5 focus:outline-none flex items-center gap-1'

export const buttonVariants = {
	default: `${defaultStyles} border border-blue-600`,
	secondary: `${defaultStyles} border border-blue-600 text-blue-600 bg-blue-200 hover:bg-blue-100`,
	small: `${defaultStyles} text-sm px-4 py-2`,
	transparent: `${defaultStyles} bg-transparent hover:bg-gray-100 text-black font-normal py-2`
}
