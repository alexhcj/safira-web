import { instance } from '.'

export const productsAPI = {
	getProducts(limit = 2, sort = '') {
		return instance.get(`products?_limit=${limit}&_sort=${sort}&_order=asc`).then((res) => res.data)
	},
}
