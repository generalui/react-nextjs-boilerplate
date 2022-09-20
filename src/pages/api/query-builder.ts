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
		filters: string
	}

	const parsedFilters: ConditionInput = JSON.parse(filters)
	console.log('parsedFilters: ', parsedFilters)

	const where = {
		where: {
			[parsedFilters.field.value]: {
				[parsedFilters.condition.value]: parsedFilters.value
			}
		}
	}

	const query = async () => {
		const [modelCount, summaryModelCount] = await prisma.$transaction([
			// @ts-expect-error TODO: Fix this type
			prisma[model].count({ ...where }),
			// @ts-expect-error TODO: Fix this type
			prisma[summaryModel].count({ ...where })
		])

		return { modelCount, summaryModelCount }
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
