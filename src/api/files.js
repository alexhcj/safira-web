import { API } from './api'

const BASE_URL = 'files'

export const filesAPI = {
	uploadAvatar(data) {
		return API.post(`${BASE_URL}/avatar`, data)
	},
	deleteAvatar(id) {
		return API.del(`${BASE_URL}/avatar/${id}`)
	},
}
