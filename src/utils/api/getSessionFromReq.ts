import { NextApiRequest } from 'next'
import { getSession } from 'next-auth/react'
import { ApiRequestWithFile } from 'types/ApiRequestWithFile'
import { Session } from 'types/Session'

/**
 * Get session from request object
 */

export async function getSessionFromReq(
	req: NextApiRequest | ApiRequestWithFile
): Promise<Session> {
	const session = (await getSession({ req })) as Session
	if (!session?.userId) {
		throw new Error('No session found')
	}
	return session
}
