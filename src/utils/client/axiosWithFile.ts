import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { axios } from 'utils/client/axios'

type WithFiles = <T>(
	url: string,
	body: AxiosRequestConfig['data'],
	files: Record<string, File[]>,
	method?: string
) => Promise<AxiosResponse<T>>

export const axiosWithFile: WithFiles = async (url, body, files, method = 'post') => {
	// Create a form data object
	const formData = new FormData()

	// Parse the rest of the request body into the formdata object
	Object.keys(body).forEach((key) => {
		if (key !== 'dataTypes') formData.append(key, body[key])
		else formData.append(key, JSON.stringify(body[key]))
	})

	// Append the files to the form data object
	Object.keys(files)?.forEach((fileUploadKey) => {
		if (!files) return
		const toUpload = files[fileUploadKey]
		console.log('~ fileUploadKey', fileUploadKey)
		console.log('~ files', files)
		console.log('~ toUpload', toUpload)

		// Only attach files
		// Strings (previews or url loaded values) are omitted from the form data object
		if (toUpload instanceof File) {
			formData.append(fileUploadKey, toUpload)
		} else if (Array.isArray(toUpload)) {
			toUpload?.forEach((file) => {
				if (toUpload instanceof File) {
					formData.append(fileUploadKey, file)
				}
			})
		}
	})

	// Call axios passing formData where the body would normally go
	return await axios({
		method,
		url,
		data: formData,
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}
