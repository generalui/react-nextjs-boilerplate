import { NextApiRequest } from 'next'

export interface ApiRequestWithFile extends NextApiRequest {
	file?: Express.Multer.File
}
