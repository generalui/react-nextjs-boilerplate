export const getEndDateFromString = (endDate: string) => {
	const [year, month, day] = endDate.split('-').map((datePart) => parseInt(datePart, 10))

	return new Date(year, month - 1, day)
}
