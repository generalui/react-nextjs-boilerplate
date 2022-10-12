import type { NextApiRequest, NextApiResponse } from 'next'
import { FilterInput, QueryBuilderModel } from 'types/QueryBuilder'
import { connect } from 'utils/api/connect'
import { handleQuery } from 'utils/api/handleQuery'
import { prisma } from 'utils/api/prisma'

const apiRoute = connect()

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const { model, summaryModel, filters } = req.query as {
		model: QueryBuilderModel
		summaryModel: QueryBuilderModel
		filters?: string
	}

	let where = {}

	if (filters) {
		const parsedFilters: FilterInput = JSON.parse(filters)
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
		model: model as QueryBuilderModel,
		query,
		role: 'admin',
		disableLog: true
	})
})

export default apiRoute
