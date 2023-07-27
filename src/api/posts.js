import { API } from './api'

const BASE_URL = 'posts'

export const postsAPI = {
	getAll(params) {
		return API.get(`${BASE_URL}/list`, params)
	},
	findOne(slug = '') {
		return API.get(`${BASE_URL}/${slug}`)
	},
}
