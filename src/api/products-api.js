import { instance } from '.'

export const productsAPI = {
	getProducts(limit = 2, sort = '', search='') {
		return instance.get(`products?name=${search}&_limit=${limit}&_sort=${sort}&_order=asc`).then((res) => res.data)
	},
}
