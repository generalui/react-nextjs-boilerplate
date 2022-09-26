import type { NextApiRequest, NextApiResponse } from 'next'
import { ConditionInput, QueryBuilderModels } from 'types/QueryBuilder'
import { connect } from 'utils/api/connect'
import { handleQuery } from 'utils/api/handleQuery'
import { prisma } from 'utils/api/prisma'

const apiRoute = connect()

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const { model, summaryModel, filters } = req.query as {
		model: QueryBuilderModels
		summaryModel: QueryBuilderModels
		filters?: string
	}

	let where = {}

	if (filters) {
		const parsedFilters: ConditionInput = JSON.parse(filters)
		const value = parsedFilters?.field.label.toLowerCase().includes('date')
			? new Date(parsedFilters?.value)
			: parsedFilters.value

		where = {
			where: {
				[parsedFilters.field.value]: {
					[parsedFilters.condition.value]: value
				}
			}
		}
	}

	const query = async () => {
		const [modelCount, summaryModelCount, list] = await prisma.$transaction([
			// @ts-expect-error TODO: Fix this type
			prisma[model].count(where && { ...where }),
			// @ts-expect-error TODO: Fix this type
			prisma[summaryModel].count(),
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
