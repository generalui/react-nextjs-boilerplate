import { User } from '@prisma/client'
import { ApiRequestWithFile } from 'types/ApiRequestWithFile'
import { connect } from 'utils/api/connect'
import { getSessionFromReq } from 'utils/api/getSessionFromReq'
import { handleQuery } from 'utils/api/handleQuery'
import { upload } from 'utils/api/media'
import { multer } from 'utils/api/multer'
import { parseFile } from 'utils/api/parseFile'
import { prisma } from 'utils/api/prisma'

export { config } from 'utils/api/multer'

/**
 * Api setup for uploading documents
 *
 * Reference tutorial: https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430
 * Multer reference: https://github.com/expressjs/multer#readme
 */

const apiRoute = connect()

// Middleware processing FormData to file
apiRoute.use(multer.single('file'))

// Handle post request
apiRoute.post(async (req: ApiRequestWithFile, res) => {
	// Get the user session
	const session = await getSessionFromReq(req)

	try {
		const documentsQuery = async () => {
			if (!req.file) throw Error('File required')

			// Add data type to base64 string
			const { base64, publicId, originalName } = await parseFile(req.file)

			// Upload (to cloudinary)
			const { secure_url } = await upload({ file: base64, publicId })

			// Create database entry for documents and add to user
			return await prisma.user.update({
				where: {
					id: session.userId as string
				},
				data: {
					documents: {
						create: {
							name: originalName,
							url: secure_url,
							fileType: 'mimetype'
						}
					}
				}
			})
		}

		handleQuery<User>({
			req,
			res,
			session,
			model: 'documents',
			role: 'admin',
			query: documentsQuery
		})
	} catch (error) {
		// Handle errors
		res.status(400).json({ message: error })
	}
})

export default apiRoute
