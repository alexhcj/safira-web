import { API } from './api'

const BASE_URL = 'products'

export const productsAPI = {
	getAll(params) {
		return API.get(`${BASE_URL}/list`, params)
	},
	getQueryBrands(params) {
		return API.get(`${BASE_URL}/list-brands`, params)
	},
	getQueryPriceRange(params) {
		return API.get(`${BASE_URL}/price-range`, params)
	},
	getAllBySlug(slug) {
		return API.get(`${BASE_URL}/list-by-slug${slug && `?slug=${slug}`}`)
	},
	getProductsByNewprice({ sort = 'newprice', order = 'desc', limit = 10, newprice_gte = 0 }) {
		return API.get(`${BASE_URL}?_sort=${sort}&_order=${order}&_limit=${limit}&newprice_gte=${newprice_gte}`)
	},
	findOne(slug = '') {
		return API.get(`${BASE_URL}/${slug}`)
	},
	findRandom() {
		return API.get(`${BASE_URL}/random`)
	},
}
