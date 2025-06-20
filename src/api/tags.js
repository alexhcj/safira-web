import { API } from './api'

const BASE_URL = 'tags'

export const tagsAPI = {
	async findUniqueDietaryTags() {
		return API.get(`${BASE_URL}/unique-dietary-tags`)
	},
}
