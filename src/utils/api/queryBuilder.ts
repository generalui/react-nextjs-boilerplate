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

		where = {
			where: {
				[parsedFilters.field.value]: {
					[parsedFilters.condition.value]: parsedFilters.value
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
