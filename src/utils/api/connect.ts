import { IncomingMessage } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect, { NextConnect, Options } from 'next-connect'
import { prisma } from './prisma'

/**
 * Api route setup with default onNoMatch function
 *
 * Reference: https://www.npmjs.com/package/next-connect
 */

const defaultOnNoMatchFunction = (req: IncomingMessage, res: NextApiResponse) => {
	// Return 405 error if a request is submitted with a unsupported request method
	res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
}

function onError(err: any, req: any, res: any, next: any) {
	console.error(err)

	res.status(500).end(err.toString())
	// OR: you may want to continue
	next()
}

type Connect = (
	nextConnectOptions?: Options<IncomingMessage, NextApiResponse>
) => NextConnect<IncomingMessage, NextApiResponse>

const onRequest = (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
	next()
}

export const connect: Connect = (nextConnectOptions = {}) => {
	return nextConnect({
		...nextConnectOptions,
		onNoMatch: nextConnectOptions.onNoMatch ?? defaultOnNoMatchFunction,
		onError
	}).use(onRequest)
}
