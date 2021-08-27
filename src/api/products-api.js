import { instance } from '.'

export const productsAPI = {
	getProducts(search = '', sort = 'popularity', order = 'desc', page = 1, limit = 10) {
		return instance
			.get(`products?name_like=${search}&_sort=${sort}&_order=${order}&_page=${page}&_limit=${limit}`)
			.then((res) => {
                return {
                    data: res.data,
                    total: res.headers['x-total-count']
                }
            })
	},
	getProductsByTags(sort = '', tag = '', order = 'desc') {
		return instance.get(`products?_sort=${sort}&tags_like=${tag}&_order=${order}`).then((res) => res.data)
	},
}
