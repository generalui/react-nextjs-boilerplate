import { QueryBuilderModel } from 'types/QueryBuilder'
import { Filter } from 'types/QueryBuilder'
import { prisma } from 'utils/api/prisma'

export const getWhere = (filters?: Filter[]) => {
	if (!filters) return {}

	let where = {}
	filters.forEach((filter: Filter) => {
		console.log('filters.forEach ~ filter.dataType', filter.dataType)

		// TODO: refactor - the type should be a prop on filter
		if (filter.dataType === 'date') {
			const value = new Date(filter.value)
			// @ts-expect-error TODO: Fix this type
			if (!(value instanceof Date && !isNaN(value))) {
				return
			}
			const nextDay = new Date(value.getTime())
			nextDay.setDate(nextDay.getDate() + 1)

			switch (filter.condition) {
				case 'equals':
					where = {
						[filter.field]: {
							lt: nextDay,
							gte: value
						}
					}
					break

				case 'not':
					where = {
						NOT: {
							[filter.field]: {
								lt: nextDay,
								gte: value
							}
						}
					}
					break

				case 'lt':
					where = {
						[filter.field]: {
							lt: value
						}
					}
					break

				case 'gt':
					where = {
						[filter.field]: {
							gt: value
						}
					}
					break
			}
		} else {
			where = {
				[filter.field]: {
					[filter.condition]: filter.value
				}
			}
		}
	})

	return {
		where
	}
}

export const getQuery = (model: QueryBuilderModel, filters?: Filter[]) => {
	const where = getWhere(filters)

	const query = async () => {
		const [modelCount, list] = await prisma.$transaction([
			// @ts-expect-error TODO: Fix this type
			prisma[model].count(where && { ...where }),
			prisma[model]
				// @ts-expect-error TODO: Fix this type
				.findMany({
					// TODO: make this include generic
					include: {
						_count: true
					},
					...where
				})
		])

		return { modelCount, list }
	}

	return query
}
