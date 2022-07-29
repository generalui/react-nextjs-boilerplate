import { NextApiRequest } from 'next'
import { ApiRequestWithFile } from 'types/ApiRequestWithFile'
import { getQueryNumber } from 'utils/getQueryNumber'

const DEFAULT_TAKE = 20
const DEFAULT_SKIP = 0

/**
 * Get session from request object
 */
type GetPaginationFromReq = (req: NextApiRequest | ApiRequestWithFile) => {
	take: number
	skip: number
}

export const getPaginationFromReq: GetPaginationFromReq = function getPaginationFromReq(req) {
	// Initialize return object with default values
	const pagination = { take: DEFAULT_TAKE, skip: DEFAULT_SKIP }

	// Return default pagination if no query options were passed
	if (!req?.query) return pagination

	// Validate that page size and page a valid numbers
	const pageSize = getQueryNumber(req.query.pageSize)
	const page = getQueryNumber(req.query.page)

	// Replace the default take and skip with values from the react query
	pagination.take = pageSize || pagination.take
	const actualPage = page && page > 0 ? page - 1 : 0
	pagination.skip = actualPage * pagination.take

	return pagination
}
