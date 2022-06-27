const defaultStyles =
	'text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-800 flex items-center gap-1'

export const buttonVariants = {
	default: defaultStyles,
	small: `${defaultStyles} text-sm px-4 py-2`,
	transparent: `${defaultStyles} bg-transparent hover:bg-gray-100 text-black font-normal py-2`
}
