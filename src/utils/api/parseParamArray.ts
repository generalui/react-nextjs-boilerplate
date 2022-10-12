type ParseParamArray = <T>(paramArray: string | string[]) => T[]

export const parseParamArray: ParseParamArray = (paramArray) => {
	let parsed = []

	if (typeof paramArray === 'string') parsed = [JSON.parse(paramArray)]
	if (Array.isArray(paramArray)) parsed = paramArray.map((p) => JSON.parse(p))

	return parsed
}
