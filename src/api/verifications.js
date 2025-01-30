import { API } from './api'

const BASE_URL = 'verifications'

export const verificationsAPI = {
	verifyEmail(data) {
		return API.post(`${BASE_URL}/verify-email`, data)
	},
	resendVerifyEmail(data) {
		return API.post(`${BASE_URL}/resend-verify-email`, data)
	},
}
