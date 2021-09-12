import { instance } from '.'

export const productsAPI = {
	getProducts({ search = '', sort = 'popularity', tag = '', order = 'desc', page = 1, limit = 10 }) {
		return instance
			.get(
				`products?name_like=${search}&_sort=${sort}&tags_like=${tag}&_order=${order}&_page=${page}&_limit=${limit}`
			)
			.then((res) => {
				return {
					data: res.data,
					total: Number(res.headers['x-total-count']),
				}
			})
	},
}
