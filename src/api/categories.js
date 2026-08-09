import { API } from './api'

const BASE_URL = 'categories'

export const categoriesAPI = {
	async findTree() {
		return API.get(`${BASE_URL}/tree`)
	},
	async findAll(params) {
		return API.get(`${BASE_URL}`, params)
	},
}
