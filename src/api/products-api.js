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
	getProductsByNewprice({ sort = 'newprice', order = 'desc', limit = 10, newprice_gte = 0 }) {
		return instance
			.get(`products?_sort=${sort}&_order=${order}&_limit=${limit}&newprice_gte=${newprice_gte}`)
			.then((res) => {
				return {
					data: res.data,
					total: Number(res.headers['x-total-count']),
				}
			})
	},
	getProduct(id = 1) {
		return instance.get(`products?id=${id}`).then((res) => res.data)
	},
}
