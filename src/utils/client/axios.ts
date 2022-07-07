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
	const formData = new FormData()

	formData.append('file', selectedFile)
	Object.keys(body).forEach((key) => {
		formData.append(key, body[key])
	})

	return await axios({
		method,
		url,
		data: formData,
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}
