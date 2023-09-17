import axios from 'axios'
import { getUserStorage } from './storage'

const getAccessToken = () => {
	const user = getUserStorage()
	return user?.accessToken
}

const callAPI = async ({ url, data, method, params = {}, headers = {}, responseType }) => {
	const config = {
		url,
		data,
		params,
		method,
		headers: {
			...axios.defaults.headers.common,
			'Content-Type': 'application/json',
			...headers,
			Authorization: `Bearer ${getAccessToken()}`,
		},
		baseURL: process.env.REACT_APP_API_URL,
		responseType,
	}

	try {
		const res = await axios(config)
		return res.data
	} catch (err) {
		console.log(err)
	}
}

export const API = {
	async get(url, params, headers, responseType) {
		return await callAPI({
			url,
			params,
			headers,
			responseType,
			method: 'GET',
		})
	},

	async post(url, data, params, headers) {
		return await callAPI({
			url,
			data,
			params,
			headers,
			method: 'POST',
		})
	},

	async put(url, data, params, headers) {
		return await callAPI({
			url,
			data,
			params,
			headers,
			method: 'PUT',
		})
	},

	async del(url, params, headers) {
		return await callAPI({
			url,
			params,
			headers,
			method: 'DELETE',
		})
	},
}
