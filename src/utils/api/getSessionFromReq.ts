import { NextApiRequest } from 'next'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { ApiRequestWithFile } from 'types/ApiRequestWithFile'

/**
 * Get session from request object
 */

export async function getSessionFromReq(
	req: NextApiRequest | ApiRequestWithFile
): Promise<Session> {
	const session = await getSession({ req })
	if (!session?.userId) {
		throw new Error('No session found')
	}
	return session
}
