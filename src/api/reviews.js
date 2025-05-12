import { API } from './api'

const BASE_URL = 'reviews'

export const reviewsAPI = {
	async create(data = {}) {
		return API.post(`${BASE_URL}/create`, data)
	},
}
