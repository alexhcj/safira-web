// Consider adding domain-specific error categorization that relates to your business logic:

export const BUSINESS_ERROR_CODES = {
	POST_NOT_FOUND: {
		severity: 'warning',
		type: 'content',
		defaultMessage: 'The requested post could not be found.',
		actions: [
			{
				label: 'Go to Blog Home',
				action: () => (window.location.href = '/blog'),
				primary: true,
			},
		],
	},
	EMAIL_NOT_VERIFIED: {
		severity: 'warning',
		type: 'auth',
		defaultMessage: 'Please verify your email address before continuing.',
		actions: [
			{
				label: 'Resend Verification',
				action: async () => {
					try {
						await authAPI.resendVerification()
						// Add success message
					} catch (e) {
						// Already handled by global interceptor
					}
				},
				primary: true,
			},
		],
	},
	PAYMENT_DECLINED: {
		severity: 'warning',
		type: 'payment',
		defaultMessage: 'Your payment was declined. Please update your payment method.',
		actions: [
			{
				label: 'Update Payment',
				action: () => (window.location.href = '/account/payment-methods'),
				primary: true,
			},
		],
	},
	RESOURCE_LIMIT_REACHED: {
		severity: 'warning',
		type: 'subscription',
		defaultMessage: 'You\'ve reached your resource limit for your current plan.',
		actions: [
			{
				label: 'Upgrade Plan',
				action: () => (window.location.href = '/pricing'),
				primary: true,
			},
		],
	},
	ACCOUNT_SUSPENDED: {
		severity: 'critical',
		type: 'account',
		defaultMessage: 'Your account has been suspended due to a policy violation.',
		actions: [
			{
				label: 'Contact Support',
				action: () => (window.location.href = '/support'),
				primary: true,
			},
		],
	},
}

// Function to detect business error codes from API responses
export const detectBusinessError = (data) => {
	if (!data || typeof data !== 'object') return null

	// Check for standard error code format
	if (data.code && BUSINESS_ERROR_CODES[data.code]) {
		return {
			...BUSINESS_ERROR_CODES[data.code],
			message: data.message || BUSINESS_ERROR_CODES[data.code].defaultMessage,
		}
	}

	// Check other formats your API might use
	if (data.error_code && BUSINESS_ERROR_CODES[data.error_code]) {
		return {
			...BUSINESS_ERROR_CODES[data.error_code],
			message: data.error_message || BUSINESS_ERROR_CODES[data.error_code].defaultMessage,
		}
	}

	return null
}
