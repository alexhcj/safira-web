/**
 * @type {Object.<number, {severity: ('info'|'warning'|'error'|'critical'), type: ('network'|'auth'|'validation'|'server'|'client'|'unknown'), defaultMessage: string}>}
 */
export const HTTP_STATUS_MAP = {
	// 4xx Client Errors
	400: {
		severity: 'warning',
		type: 'validation',
		defaultMessage: 'Invalid request data. Please check your input.',
	},
	401: {
		severity: 'error',
		type: 'auth',
		defaultMessage: 'Authentication required. Please log in again.',
	},
	403: {
		severity: 'error',
		type: 'auth',
		defaultMessage: 'You don\'t have permission to access this resource.',
	},
	404: {
		severity: 'warning',
		type: 'client',
		defaultMessage: 'The requested resource was not found.',
	},
	422: {
		severity: 'warning',
		type: 'validation',
		defaultMessage: 'Validation failed. Please check your input.',
	},
	429: {
		severity: 'warning',
		type: 'client',
		defaultMessage: 'Too many requests. Please try again later.',
	},

	// 5xx Server Errors
	500: {
		severity: 'error',
		type: 'server',
		defaultMessage: 'Internal server error occurred.',
	},
	502: {
		severity: 'error',
		type: 'server',
		defaultMessage: 'Bad gateway. Please try again later.',
	},
	503: {
		severity: 'error',
		type: 'server',
		defaultMessage: 'Service unavailable. Please try again later.',
	},
	504: {
		severity: 'error',
		type: 'server',
		defaultMessage: 'Gateway timeout. Please try again later.',
	},
}

// Function to get error mapping with fallbacks
export const getErrorMapping = (status) => {
	if (!status) {
		return {
			severity: 'warning',
			type: 'unknown',
			defaultMessage: 'An unexpected error occurred.',
		}
	}

	// Find specific status or use range mapping
	const mapping = HTTP_STATUS_MAP[status]
	if (mapping) return mapping

	// Handle ranges
	if (status >= 400 && status < 500) {
		return {
			severity: 'warning',
			type: 'client',
			defaultMessage: 'Client error occurred.',
		}
	}

	if (status >= 500) {
		return {
			severity: 'error',
			type: 'server',
			defaultMessage: 'Server error occurred.',
		}
	}

	return {
		severity: 'warning',
		type: 'unknown',
		defaultMessage: 'Unexpected status code received.',
	}
}

// Special error type detection
export const detectErrorType = (error) => {
	if (!navigator.onLine) return 'network'

	if (error?.code === 'ECONNABORTED') return 'network'

	if (error?.message?.includes('Network Error')) return 'network'

	return 'unknown'
}
