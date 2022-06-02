import { NextApiRequest } from 'next'

export interface ApiRequestWithFile extends NextApiRequest {
	file: {
		buffer: Buffer
	}
}
