import { InputType, QueryBuilderModel } from 'types/QueryBuilder'
import { Filter } from 'types/QueryBuilder'
import { prisma } from 'utils/api/prisma'

export const getSingleWhere = (filter?: Filter) => {
	let where = {}
	if (!filter || !filter.value) return where

	// TODO: refactor - the type should be a prop on filter
	if (filter.dataType === InputType.DATE) {
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
	} else if (filter.dataType === InputType.SELECT) {
		switch (filter.condition) {
			case 'notIncludes':
				where = {
					NOT: {
						[filter.field]: {
							has: filter.value
						}
					}
				}
				break
			default:
				where = {
					[filter.field]: {
						[filter.condition]: filter.value
					}
				}
				break
		}
	} else {
		where = {
			[filter.field]: {
				[filter.condition]: filter.value,
				mode: 'insensitive' // Default value: default
			}
		}
	}

	return { where }
}

// TODO: add multi-where statement
// export const getWhere = (filters?: Filter[]) => {
// 	if (!filters) return {}

// 	const ret = filters.reduce((where, filter: Filter) => {
// 		// Manage clause here [and, or, excluding]
// 		return {
// 			...where,
// 			...getSingleWhere(filter)
// 		}
// 	}, {})
// 	console.log('getWhere ~ ret', ret)

// 	return {
// 		where: ret
// 	}
// }

export const getQuery = (model: QueryBuilderModel, filters?: Filter[]) => {
	// TODO: manage multi filter
	const where = getSingleWhere(filters?.[0])
	console.log('getQuery ~ where', where)

	const query = async () => {
		const [modelCount, list] = await prisma.$transaction([
			// @ts-expect-error TODO: Fix this type
			prisma[model].count(where && { ...where }),
			prisma[model]
				// @ts-expect-error TODO: Fix this type
				.findMany({
					// TODO: make this include generic
					// include: {
					// 	_count: true
					// },
					...where
				})
		])

		return { modelCount, list }
	}

	return query
}
