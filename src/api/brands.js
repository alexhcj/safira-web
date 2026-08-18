import { API } from './api'

const BASE_URL = 'brands'

export const brandsAPI = {
	async findGroupedBrands() {
		return API.get(`${BASE_URL}/grouped-brands`)
	},
}
