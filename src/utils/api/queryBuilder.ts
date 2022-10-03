import { ConditionInput, QueryBuilderModel } from 'types/QueryBuilder'
import { prisma } from 'utils/api/prisma'

export const tranformField = (field: ConditionInput) => {
	return {
		[field.field.value]: {
			[field.condition.value]: field.value
		}
	}
}

export const getWhere = (filters?: string) => {
	let where = {}

	if (filters) {
		const parsedFilters: ConditionInput = JSON.parse(filters)
		let value
		let whereStatement = {}

		if (parsedFilters?.field.label.toLowerCase().includes('date')) {
			value = new Date(parsedFilters?.value)
			// @ts-expect-error TODO: Fix this type
			if (!(value instanceof Date && !isNaN(value))) {
				return
			}
			const nextDay = new Date(value.getTime())
			nextDay.setDate(nextDay.getDate() + 1)

			switch (parsedFilters.condition.value) {
				case 'equals':
					whereStatement = {
						[parsedFilters.field.value]: {
							gte: value,
							lt: nextDay
						}
					}
					break
			}
		} else {
			value = parsedFilters.value
			whereStatement = {
				[parsedFilters.field.value]: {
					[parsedFilters.condition.value]: value
				}
			}
		}

		where = {
			where: whereStatement
		}
	}

	return where
}

export const getQuery = (model: QueryBuilderModel, filters?: string) => {
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
