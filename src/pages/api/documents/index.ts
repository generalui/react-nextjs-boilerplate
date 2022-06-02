import multer from 'multer'
import { ApiRequestWithFile } from 'types/ApiRequestWithFile'
import { connect } from 'utils/api/connect'
import { upload } from 'utils/api/media'
import { parseFile } from 'utils/api/parseFile'

/**
 * Api setup for uploading documents
 *
 * Reference tutorial: https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430
 * Mutler reference: https://github.com/expressjs/multer#readme
 */

const apiRoute = connect()

// Config mutler to process files in memory
const uploadMiddleware = multer({
	storage: multer.memoryStorage()
})

// Middleware processing FormData to file
apiRoute.use(uploadMiddleware.single('file'))

// Handle post request
apiRoute.post(async (req: ApiRequestWithFile, res) => {
	try {
		// Add data type to base64 string
		const { base64, publicId, originalName } = parseFile(req.file)

		// Upload (to cloudinary)
		const cloudinaryResponse = await upload({ file: base64, publicId })

		console.log('~ cloudinaryResponse', cloudinaryResponse)
	} catch (error) {
		// Handle errors
		console.log('error: ', error)
		res.status(400).json({ message: error })
	}
})

export default apiRoute

// Disallow body parsing, consume as stream, for file upload
export const config = {
	api: {
		bodyParser: false
	}
}
