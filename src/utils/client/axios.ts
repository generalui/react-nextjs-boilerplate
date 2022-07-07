import axiosClient from 'axios'

// Set config defaults when creating the instance
export const axios = axiosClient.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL
})
