export const getQueryNumber = (value?: unknown) =>
	typeof value === 'number'
		? value
		: typeof value === 'string' && !isNaN(parseInt(value))
		? parseInt(value)
		: undefined
