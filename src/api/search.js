import { API } from './api'

const BASE_URL = 'search'

export const searchAPI = {
	async findAllMatches(params = {}) {
		return API.get(`${BASE_URL}`, params)
	},
}
