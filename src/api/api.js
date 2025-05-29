import axios from 'axios'

import { detectErrorType, getErrorMapping } from '@utils/validation/api-errors'

import { getUserStorage } from './storage'

const getAccessToken = () => {
	const user = getUserStorage()
	return user?.accessToken
}

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 90000, // Render DB warm up ~50 sec. TODO: remove to 15 in prod\no warm up DB?
	headers: {
		'Content-Type': 'application/json',
	},
})

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
	(config) => {
		const token = getAccessToken()
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject(error),
)

export const setupErrorHandling = (addErrorFn) => {
	axiosInstance.interceptors.response.use(
		(response) => response,
		(error) => {
			let errorMessage
			let statusCode = error.response?.status
			let errorType
			let severity = 'warning'
			let context = {}

			if (error.response) {
				statusCode = error.response.status
				const data = error.response.data

				// Get the error map based on status code
				const errorMap = getErrorMapping(statusCode)
				errorType = errorMap.type
				severity = errorMap.severity
				errorMessage = data?.message || errorMap.defaultMessage

				if (errorType === 'validation' && data?.errors) {
					context = { fieldErrors: data.errors }
				}

				// Handle specific status codes
				if (statusCode === 401) {
					// Refresh logic
					// actions.push({
					// 	label: 'Refresh session',
					// 	action: () => refreshToken(),
					// 	primary: true
					// })

					console.log('Unauthorized access, redirecting to login...')
				}
			} else if (error.request) {
				// Error in request request
				errorType = detectErrorType(error)
				errorMessage = !navigator.onLine
					? 'You appear to be offline. Please check your internet connection.'
					: 'No response received from server. The service may be unavailable.'

				severity = 'error'
			} else {
				// Error in request configuration
				errorType = 'client'
				errorMessage = error.message || 'Request failed to send.'
			}

			// Add error to context
			addErrorFn({
				status: statusCode,
				message: errorMessage,
				path: error.config?.url || '',
				severity,
				type: errorType,
				context,
			})

			// For critical errors (log to server)
			if (severity === 'critical') {
				// logErrorToServer(error, { errorType, message: errorMessage })
			}

			return Promise.reject(error)
		},
	)
}

const callAPI = async ({ url, data, method, params = {}, headers = {}, responseType }) => {
	const response = await axiosInstance({
		url,
		method,
		data,
		params,
		headers,
		responseType,
	})

	return response.data
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
