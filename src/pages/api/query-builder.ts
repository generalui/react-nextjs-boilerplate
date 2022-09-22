import type { NextApiRequest, NextApiResponse } from 'next'
import { ConditionInput, QueryBuilderModels } from 'types/QueryBuilder'
import { connect } from 'utils/api/connect'
import { handleQuery } from 'utils/api/handleQuery'
import { prisma } from 'utils/api/prisma'

const apiRoute = connect()

// Get a aggregated study data
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const { model, summaryModel, filters } = req.query as {
		model: QueryBuilderModels
		summaryModel: QueryBuilderModels
		filters?: string
	}

	let where = {}

	if (filters) {
		const parsedFilters: ConditionInput = JSON.parse(filters)
		console.log('parsedFilters: ', parsedFilters)

		where = {
			where: {
				[parsedFilters.field.value]: {
					[parsedFilters.condition.value]: parsedFilters.value
				}
			}
		}
	}

	const query = async () => {
		const [modelCount, summaryModelCount, list] = await prisma.$transaction([
			// @ts-expect-error TODO: Fix this type
			prisma[model].count(where && { ...where }),
			// @ts-expect-error TODO: Fix this type
			prisma[summaryModel].count(where && { ...where }),
			// @ts-expect-error TODO: Fix this type
			prisma[model].findMany({
				// TODO: make this include generic
				include: {
					_count: true
				},
				...where
			})
		])

		return { modelCount, summaryModelCount, list }
	}

	handleQuery({
		req,
		res,
		model: model as QueryBuilderModels,
		query,
		role: 'admin',
		disableLog: true
	})
})

export default apiRoute
