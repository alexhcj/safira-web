import { API } from './api'

const BASE_URL = 'profiles'

export const profilesAPI = {
	findByUserId(id) {
		return API.get(`${BASE_URL}/${id}`)
	},
	update(data) {
		return API.put(`${BASE_URL}`, data)
	},
}
