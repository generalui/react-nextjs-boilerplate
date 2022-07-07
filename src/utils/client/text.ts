export const getCombinedString = (original: string | string[]) =>
	Array.isArray(original) ? original.join('') : original
