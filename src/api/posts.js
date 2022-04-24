import {API} from "./api";

export const postsAPI = {
	getAll({limit = '', title = '', sort = 'date', order = 'desc', category = '', start = 0, end = ''}) {
		return API
		.get(
			`posts?title_like=${title}&_sort=${sort}&_order=${order}&category_like=${category}&_start=${start}&_end=${end}&_limit=${limit}`
		)
	},
	findOne(id) {
		return API.get(`posts?id=${id}`)
	},
	getComments({sort = 'date', limit = '', order = 'desc'}) {
		return API.get(`postComments?_sort=${sort}&_limit=${limit}&_order=${order}`)
	}
}
