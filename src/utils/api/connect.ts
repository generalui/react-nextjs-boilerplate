import { IncomingMessage } from 'http'
import { NextApiResponse } from 'next'
import nextConnect, { NextConnect, Options } from 'next-connect'

/**
 * Api route setup with default onNoMatch function
 *
 * Reference: https://www.npmjs.com/package/next-connect
 */

const defaultOnNoMatchFunction = (req: IncomingMessage, res: NextApiResponse) => {
	// Return 405 error if a request is submitted with a unsupported request method
	res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
}

type Connect = (
	nextConnectOptions?: Options<IncomingMessage, NextApiResponse>
) => NextConnect<IncomingMessage, NextApiResponse>

export const connect: Connect = (nextConnectOptions = {}) => {
	return nextConnect({
		...nextConnectOptions,
		onNoMatch: nextConnectOptions.onNoMatch ?? defaultOnNoMatchFunction
	})
}
