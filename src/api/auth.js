import { API } from './api'

const BASE_URL = 'auth'

export const authAPI = {
	async register(form) {
		return API.post(`${BASE_URL}/register`, form)
	},
	async login(form) {
		return API.post(`${BASE_URL}/login`, form)
	},
	async logout() {
		return API.post(`${BASE_URL}/logout`)
	},
	async logoutAll() {
		return API.post(`${BASE_URL}/logout-all`)
	},
	// Cookie-guarded on the backend (reads the httpOnly refresh-token
	// cookie, no Authorization header needed/expected). Returns a fresh
	// { id, accessToken }.
	async refresh() {
		return API.post(`${BASE_URL}/refresh`)
	},
	// Access-token-guarded (JwtAuthGuard). Returns { id }
	// deliberately WITHOUT accessToken, since this doesn't mint a new
	// session, it just validates the current one.
	async me() {
		return API.get(`${BASE_URL}/me`)
	},
}
