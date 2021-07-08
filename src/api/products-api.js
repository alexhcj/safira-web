import { instance } from '.'

export const productsAPI = {
	getProducts(limit = 2) {
		return instance.get(`products?_limit=${limit}`).then((res) => res.data)
	},
}
