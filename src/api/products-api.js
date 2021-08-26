import { instance } from '.'

export const productsAPI = {
	getProducts(sort = 'popularity', search = '', order = 'desc') {
		return instance.get(`products?_sort=${sort}&name_like=${search}&_order=${order}`).then((res) => res.data)
	},
	getProductsByTags(sort = '', tag = '', order = 'desc') {
		return instance.get(`products?_sort=${sort}&tags_like=${tag}&_order=${order}`).then((res) => res.data)
	},
}
