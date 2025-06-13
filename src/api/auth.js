import { API } from './api'

const BASE_URL = 'auth'

export const authAPI = {
	async register(form) {
		return API.post(`${BASE_URL}/register`, form)
	},
	async login(form) {
		return API.post(`${BASE_URL}/login`, form)
	},
}
