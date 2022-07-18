import { NextApiRequest } from 'next'

export interface ApiRequestWithFile extends NextApiRequest {
	file?: Express.Multer.File
	documentation?: Express.Multer.File[]
	files?: Record<string, Express.Multer.File[]>
}
