import { instance } from '.'

export const productsAPI = {
	getProducts(limit = 2, search = '', sort = 'popularity', order = 'desc') {
		return instance
			.get(`products?_limit=${limit}&_sort=${sort}&name_like=${search}&_order=${order}`)
			.then((res) => res.data)
	},
	getProductsByTags(limit = 2, sort = '', tag = '', order = 'desc') {
		return instance
			.get(`products?_limit=${limit}&_sort=${sort}&tags_like=${tag}&_order=${order}`)
			.then((res) => res.data)
	},
}
