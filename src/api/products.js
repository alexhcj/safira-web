import { API } from './api'

const BASE_URL = 'products'

export const productsAPI = {
	async getAll(params) {
		return API.get(`${BASE_URL}/list`, params)
	},
	async getRelated({ limit, slug }) {
		return API.get(`${BASE_URL}/related?limit=${limit}&slug=${slug}`)
	},
	async findQueryBrands(params) {
		return API.get(`${BASE_URL}/list-brands`, params)
	},
	async findAllBrands() {
		return API.get(`${BASE_URL}/all-brands`)
	},
	async getQueryPriceRange(params) {
		return API.get(`${BASE_URL}/price-range`, params)
	},
	async getAllBySlug(slug) {
		return API.get(`${BASE_URL}/list-by-slug${slug && `?slug=${slug}`}`)
	},
	async getProductsByNewprice({ sort = 'newprice', order = 'desc', limit = 10, newprice_gte = 0 }) {
		return API.get(`${BASE_URL}?_sort=${sort}&_order=${order}&_limit=${limit}&newprice_gte=${newprice_gte}`)
	},
	async findOne(slug = '') {
		return API.get(`${BASE_URL}/${slug}`)
	},
	async findRandom() {
		return API.get(`${BASE_URL}/random`)
	},
}
