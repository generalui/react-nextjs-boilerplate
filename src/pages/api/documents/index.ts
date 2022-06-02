import multer from 'multer'
import { NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { ApiRequestWithFile } from 'types/ApiRequestWithFile'
import { upload } from 'utils/api/media'

const uploadMiddleware = multer({
	storage: multer.memoryStorage()
})

const apiRoute = nextConnect({
	// Handle any other HTTP method
	onNoMatch(req, res: NextApiResponse) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
	}
})

apiRoute.use(uploadMiddleware.single('file'))

// Process a POST request
apiRoute.post(async (req: ApiRequestWithFile, res) => {
	try {
		const file = 'data:image/png;base64,' + req.file.buffer.toString('base64')
		await upload({ file })
	} catch (error) {
		console.log('error: ', error)
		res.status(400).json({ message: error })
	}
})

export default apiRoute

export const config = {
	api: {
		bodyParser: false // Disallow body parsing, consume as stream
	}
}

// error codes (pdf, jpg, png)
// Automatic document options
// Save in postgres
// Upload from frontend
// convert to data buffer or whatever
