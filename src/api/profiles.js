import { API } from './api'

const BASE_URL = 'profiles'

export const profilesAPI = {
	findProfile() {
		return API.get('users/find-profile')
	},
	update(data) {
		return API.put(`${BASE_URL}`, data)
	},
}
