import { API } from './api'

const BASE_URL = 'comments'

export const commentsAPI = {
	getAll(params) {
		return API.get(`${BASE_URL}`, params)
	},
	getBySlug(slug = '') {
		return API.get(`${BASE_URL}/${slug}`)
	},
}
