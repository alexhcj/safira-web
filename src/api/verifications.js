import { API } from './api'

const BASE_URL = 'verifications'

export const verificationsAPI = {
	async verifyEmail(data = {}) {
		return API.post(`${BASE_URL}/verify-email`, data)
	},
	async changeEmail(data = {}) {
		return API.post(`${BASE_URL}/change-email`, data)
	},
	async verifyNewEmail(data = {}) {
		return API.post(`${BASE_URL}/verify-new-email`, data)
	},
	async validatePassword(data = {}) {
		return API.post(`${BASE_URL}/validate-password`, data)
	},
	async changePassword(data = {}) {
		return API.post(`${BASE_URL}/change-password`, data)
	},
	async verifyCode(data = {}) {
		return API.post(`${BASE_URL}/verify-code`, data)
	},
	async resetPassword(data = {}) {
		return API.post(`${BASE_URL}/reset-password?${data.query}`, data.form)
	},
	async resendVerifyEmail(data = {}) {
		return API.post(`${BASE_URL}/resend-verify-email`, data)
	},
}
