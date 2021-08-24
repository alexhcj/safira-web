import { instance } from '.'

export const productsAPI = {
	getProducts(limit = 2, search='', sort = '', order='desc') {
		return instance.get(`products?name_like=${search}&_limit=${limit}&_sort=${sort}&_order=${order}`).then((res) => res.data)
	},
}
