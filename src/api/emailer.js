import { API } from './api'

const BASE_URL = 'emailer'

export const emailerAPI = {
	async findSubscription() {
		return API.get(`${BASE_URL}`)
	},
	async subscribe(data) {
		return API.post(`${BASE_URL}/subscribe-user`, data)
	},
	async update(data) {
		return API.put(`${BASE_URL}/update-subscription`, data)
	},
}
