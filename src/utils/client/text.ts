// Todo move out of client folder as this is also used on the server
export const getCombinedString = (original: string | string[]) =>
	Array.isArray(original) ? original.join('') : original

export const capitalizeFirstLetter = (word: string) => {
	return word.charAt(0).toUpperCase() + word.slice(1)
}
