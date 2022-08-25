import uploadMiddleware from 'multer'

/**
 * Config multer to process files in memory
 * https://www.npmjs.com/package/multer
 *
 * Must be used in with config
 *
 * @example
 * import { multer } from 'utils/api/multer'
 * export { config } from 'utils/api/multer'
 * // ...
 * apiRoute.use(
 * 	multer.fields([
 * 		{ name: 'image', maxCount: 1 },
 *		{ name: 'documentation', maxCount: 20 }
 * 	])
 * )
 *
 * Reference tutorial: https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430
 * Multer reference: https://github.com/expressjs/multer#readme
 *
 * @returns {uploadMiddleware.StorageEngine} multer storage engine
 */
export const multer = uploadMiddleware({
	storage: uploadMiddleware.diskStorage({})
})

// Disallow body parsing, consume as stream, for file upload
export const config = {
	api: {
		bodyParser: false
	}
}
