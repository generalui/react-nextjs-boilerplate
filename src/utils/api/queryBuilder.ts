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

		if (parsedFilters?.field.label.toLowerCase().includes('date')) {
			value = new Date(parsedFilters?.value)
			// @ts-expect-error TODO: Fix this type
			if (!(value instanceof Date && !isNaN(value))) {
				return
			}
		} else {
			value = parsedFilters.value
		}

		where = {
			where: {
				[parsedFilters.field.value]: {
					[parsedFilters.condition.value]: value
				}
			}
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
			// @ts-expect-error TODO: Fix this type
			prisma[model].findMany({
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
