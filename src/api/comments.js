import { API } from './api'

const BASE_URL = 'comments'

export const commentsAPI = {
	getAll(params) {
		return API.get(`${BASE_URL}`, params)
	},
	findRecentComments(params) {
		return API.get(`${BASE_URL}/recent-comments`, params)
	},
	getBySlug(slug = '') {
		return API.get(`${BASE_URL}/${slug}`)
	},
	create(slug, text) {
		return API.post(`${BASE_URL}/${slug}`, text)
	},
	update(postSlug, data, params) {
		return API.put(`${BASE_URL}/${postSlug}`, data, params)
	},
}
