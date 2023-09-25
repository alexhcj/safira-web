import { API } from './api'

const BASE_URL = 'auth'

export const authAPI = {
	register(form) {
		return API.post(`${BASE_URL}/register`, form)
	},
	login(form) {
		return API.post(`${BASE_URL}/login`, form)
	},
}
