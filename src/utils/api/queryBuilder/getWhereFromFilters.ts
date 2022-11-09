import { Filter, GetWhereFromFilters } from 'types/QueryBuilder'
import { getSingleWhere } from 'utils/api/queryBuilder'

export const getWhereFromFilters: GetWhereFromFilters = (filters, model) => {
	// Filter relevant data model
	const filtersToParse = filters.filter((filter) => filter.model === model)

	// Filter handle empty case of relevant data model
	if (filtersToParse.length === 0) return { where: undefined }
	else if (filtersToParse.length === 1 && !filtersToParse[0].filterType)
		return { where: getSingleWhere(filtersToParse[0]) }

	// Parse filters
	const where = filtersToParse
		// Get compose statement from filters
		.reduce(
			(where: Record<string, unknown>, filter: Filter) => {
				const { filterType } = filter
				const currentWhere = getSingleWhere(filter)

				// Called only on first iteration
				if (!filterType) {
					return {
						...where,
						OR: [currentWhere]
					}
				}

				// Add to filterType on where
				else {
					return {
						...where,
						[filterType.toUpperCase()]: [
							...(where[filterType.toUpperCase()] as Record<string, unknown>[]),
							{ ...currentWhere }
						]
					}
				}
			},
			{
				OR: [],
				AND: []
			}
		)

	return { where }
}
