import { API } from './api'

const BASE_URL = 'search'

export const searchAPI = {
	globalSearch(params) {
		return API.get(`${BASE_URL}`, params)
	},
}
