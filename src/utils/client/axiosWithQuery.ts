import { AxiosResponse } from 'axios'
import qs from 'query-string'
import { QueryOptions } from 'types/index'
import { axios } from 'utils/client/axios'

type AxiosWithQuery = <T>(url: string, query?: QueryOptions) => Promise<AxiosResponse<T>>

/**
 * Axios get request with query options passed as object
 *
 * Stringifies query object and makes an axios request
 *
 * @param url
 * @param query
 * @param method
 * @returns
 */
export const axiosWithQuery: AxiosWithQuery = async (url, query) => {
	// If query stringify the query
	const queryString = query ? '?' + qs.stringify(query) : ''

	return axios.get(`${url}${queryString}`)
}
