import {API} from "./api";

const BASE_URL = 'reviews'

export const reviewsAPI = {
	create(data) {
		return API.post(`${BASE_URL}/create`, data)
	}
}
