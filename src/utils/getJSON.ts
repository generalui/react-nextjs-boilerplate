type GetJSON = (
	jsonString?: string,
	defaultValue?: undefined | Record<string, unknown>
) => undefined | Record<string, unknown>

export const getJSON: GetJSON = (jsonString, defaultValue = undefined) => {
	let jsonObject = defaultValue
	if (jsonString) {
		jsonObject = JSON.parse(jsonString)
	} else {
		return defaultValue
	}

	return jsonObject
}
