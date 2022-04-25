// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	console.log('~ req', req)

	res
		.status(200)
		.json({ name: 'John Doe', userId: req.query['user-id'], orgId: req.query['org-id'] })
}
