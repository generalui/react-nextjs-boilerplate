import axiosClient, { AxiosRequestConfig, AxiosResponse } from 'axios'

// Set config defaults when creating the instance
export const axios = axiosClient.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL
})

type WithFile = <T>(
	url: string,
	body: AxiosRequestConfig['data'],
	selectedFile: File,
	method?: string
) => Promise<AxiosResponse<T>>
export const withFile: WithFile = async (url, body, selectedFile, method = 'post') => {
	// Create a form data object
	const formData = new FormData()

	// Parse the rest of the request body into the formdata object
	Object.keys(body).forEach((key) => {
		if (key !== 'dataTypes') formData.append(key, body[key])
		else formData.append(key, JSON.stringify(body[key]))
	})

	// If no selected file or select file is not of type file (default state) make a regular axios request
	if (selectedFile && selectedFile instanceof File) {
		// Append the file to the form data object
		formData.append('file', selectedFile)
	}

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
