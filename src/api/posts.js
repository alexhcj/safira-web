import { API } from './api'

const BASE_URL = 'posts'

export const postsAPI = {
	async getAll(params = {}) {
		return API.get(`${BASE_URL}/list`, params)
	},
	async findBySlug(slug = '') {
		return API.get(`${BASE_URL}/${slug}`)
	},
}
