import { API } from './api'

const BASE_URL = 'comments'

export const commentsAPI = {
	async getAll(params) {
		return API.get(`${BASE_URL}`, params)
	},
	async findRecentComments(params) {
		return API.get(`${BASE_URL}/recent-comments`, params)
	},
	async getBySlug(slug = '') {
		return API.get(`${BASE_URL}/${slug}`)
	},
	async create({ slug, text }) {
		return API.post(`${BASE_URL}/${slug}`, text)
	},
	async update(slug, data, { nestedLvl }) {
		return API.put(`${BASE_URL}/${slug}?nestedLvl=${nestedLvl || 0}`, data)
	},
}
