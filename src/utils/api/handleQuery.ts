import { MethodType } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'types/Session'
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
	disableLog = false,
	storeBody = true
}) => {
	try {
		session = session || (await getSessionFromReq(req))
		const queryResult = (await query()) as { id: string } | [] | null

		if (!disableLog && queryResult) {
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
		res.status(400).json({ message: error })
	}
}
