import { API } from './api'

const BASE_URL = 'verifications'

export const verificationsAPI = {
	verifyEmail(data) {
		return API.post(`${BASE_URL}/verify-email`, data)
	},
	changeEmail(data) {
		return API.post(`${BASE_URL}/change-email`, data)
	},
	verifyNewEmail(data) {
		return API.post(`${BASE_URL}/verify-new-email`, data)
	},
	validatePassword(data) {
		return API.post(`${BASE_URL}/validate-password`, data)
	},
	changePassword(data) {
		return API.post(`${BASE_URL}/change-password`, data)
	},
	verifyCode(data) {
		return API.post(`${BASE_URL}/verify-code`, data)
	},
	resetPassword(data) {
		return API.post(`${BASE_URL}/reset-password?${data.query}`, data.form)
	},
	resendVerifyEmail(data) {
		return API.post(`${BASE_URL}/resend-verify-email`, data)
	},
}
