import { API } from './api'

const BASE_URL = 'offers'

export const offersAPI = {
	getAll({ type }) {
		return API.get(`${BASE_URL}/list?${type ? `type=${type}` : ''}`)
	},
	getOfferByType(type) {
		return API.get(`${BASE_URL}/${type}`)
	},
}
