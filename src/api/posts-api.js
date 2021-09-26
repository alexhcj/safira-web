import { instance } from '.'

export const postsAPI = {
	getPosts({limit = '', title = '', sort = 'date', order = 'desc', category = '', start = 0, end = ''}) {
		return instance
		.get(
			`posts?title_like=${title}&_sort=${sort}&_order=${order}&category_like=${category}&_start=${start}&_end=${end}&_limit=${limit}`
		)
		.then(res => {
			return {
				data: res.data,
				total: res.headers['x-total-count']
			}
		})
	},
	getPost(id) {
		return instance.get(`posts?id=${id}`).then(res => res.data)
	},
	getComments({sort = 'date', limit = '', order = 'desc'}) {
		return instance.get(`postComments?_sort=${sort}&_limit=${limit}&_order=${order}`).then(res => res.data)
	}
}
