// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from 'utils/api/connect'

const apiRoute = connect()

apiRoute.get((req: NextApiRequest, res: NextApiResponse) => {
	res.status(200).json({ name: 'John Doe' })
})

export default apiRoute
