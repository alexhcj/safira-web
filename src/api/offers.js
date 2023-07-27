import { API } from './api'

const BASE_URL = 'offers'

export const offersAPI = {
	getOfferByType(type) {
		return API.get(`${BASE_URL}/${type}`)
	}
}
