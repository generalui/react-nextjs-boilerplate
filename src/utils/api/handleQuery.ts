import { MethodType } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'types/Session'
import { Roles } from 'types/User'
import { getUserIsAuthorized } from 'utils/api/getUserIsAuthorized'
import { logDBEvent } from 'utils/api/logDBEvent'
import { getSessionFromReq } from './getSessionFromReq'

export type HandleQueryProps<T> = {
	req: NextApiRequest
	res: NextApiResponse
	model: string
	query: () => Promise<T | undefined>
	session?: Session
	disableLog?: boolean
	storeBody?: boolean
	role?: Roles
}

type HandleQuery = <T>(props: HandleQueryProps<T>) => Promise<void>

const stripImageFromBody = (body: NextApiRequest['body']) => {
	if (!body) return undefined
	if (body.image) delete body.image
	return { ...body }
}

export const handleQuery: HandleQuery = async ({
	req,
	res,
	model,
	query,
	session,
	role,
	disableLog = false,
	storeBody = true
}) => {
	try {
		session = session || (await getSessionFromReq(req))
		const queryResult = (await query()) as { id: string } | [] | null

		const userIsAuthorized = getUserIsAuthorized(session, role)
		if (!userIsAuthorized) return res.status(401).json({ message: 'Unauthorized' })

		if (!disableLog && queryResult) {
			// TODO: logging does not currently support paginated requests
			const recordIds: string[] =
				'id' in queryResult ? [queryResult.id] : queryResult.map(({ id }) => id)

			logDBEvent({
				methodType: (req.method?.toLowerCase() as MethodType) || MethodType.get,
				model,
				recordIds,
				body: storeBody ? stripImageFromBody(req.body) : undefined,
				userId: session.userId
			})
		}

		await res.status(200).json(queryResult)
	} catch (error) {
		console.error({ error })
		res.status(400).json({ message: error })
	}
}
