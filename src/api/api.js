import axios from 'axios'

import { detectErrorType, getErrorMapping } from '@utils/validation/api-errors'

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 90000, // Render DB warm up ~50 sec. TODO: remove to 15 in prod\no warm up DB?
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true, // sends the httpOnly refresh-token cookie automatically
})

// ---------------------------------------------------------------------------
// Auth wiring
//
// Registered once, unconditionally, at module load - not tied to any React
// component's mount lifecycle. AuthProvider "plugs in" the real behavior via
// configureAuthInterceptors() on mount; until then these are harmless no-ops.
// This guarantees deterministic ordering relative to setupErrorHandling()
// below (whichever interceptor is *added* first runs first on the way back
// through a rejected response), and survives StrictMode remounts / HMR
// without needing to re-register anything.
// ---------------------------------------------------------------------------
let getAccessToken = () => null
let refreshSession = async () => ({ success: false })
let onSessionExpired = () => {}

export function configureAuthInterceptors({ getToken, refresh, onExpired }) {
	getAccessToken = getToken
	refreshSession = refresh
	onSessionExpired = onExpired
}

// A 401 from one of these means "no valid session" / "bad credentials" -
// never "token expired, try refreshing". Two separate reasons this list is
// needed in both interceptors below:
// - Response interceptor: retrying /auth/refresh's OWN 401 by calling
//   refresh-and-retry again is a real deadlock (getOrStartRefresh() would
//   end up awaiting the very promise it's already inside).
// - Request interceptor: /auth/refresh should authenticate purely via the
//   httpOnly cookie (withCredentials). Attaching a - necessarily expired,
//   that's WHY refresh is being called - access token invites a backend
//   that inspects Authorization globally to reject the refresh call for a
//   reason that has nothing to do with the refresh token's actual validity.
const AUTH_ENDPOINTS_TO_SKIP = ['auth/refresh', 'auth/login', 'auth/register', 'auth/logout', 'auth/logout-all']

function isAuthBootstrapEndpoint(url = '') {
	return AUTH_ENDPOINTS_TO_SKIP.some((endpoint) => url.includes(endpoint))
}

axiosInstance.interceptors.request.use((config) => {
	const token = getAccessToken()

	// Skip on retried requests - the response interceptor below already set
	// a fresh Authorization header on `originalRequest` before retrying it.
	if (token && !config._retry && !isAuthBootstrapEndpoint(config.url)) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})

// Multiple requests can 401 around the same moment (a burst of calls right
// as the token expires). Without this, each one would fire its own
// concurrent /auth/refresh call - wasteful, and actively broken if your
// backend rotates refresh tokens on use (only the first would succeed).
// This makes every concurrent 401 await the *same* in-flight refresh.
let inFlightRefresh = null

function getOrStartRefresh() {
	if (!inFlightRefresh) {
		inFlightRefresh = refreshSession().finally(() => {
			inFlightRefresh = null
		})
	}
	return inFlightRefresh
}

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config
		const status = error.response?.status

		// 401 = access token missing/invalid/expired (standard for
		// JwtAuthGuard). `_retry` guards against an infinite loop if the
		// refresh token itself is also dead - only ever try once per request.
		if (status === 401 && originalRequest && !originalRequest._retry && !isAuthBootstrapEndpoint(originalRequest.url)) {
			originalRequest._retry = true

			const res = await getOrStartRefresh()

			if (res.success) {
				originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`
				return axiosInstance(originalRequest)
			}

			onSessionExpired()
		}

		return Promise.reject(error)
	},
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

				// 401 handling (silent refresh + retry) already happened in
				// the auth interceptor above, which runs first. If a 401
				// makes it here, refresh already failed - it's a real
				// "you're logged out" case, so it just gets the default
				// message from errorMap like any other error type.
			} else if (error.request) {
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
