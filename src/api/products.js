import {API} from "./api";

const BASE_URL = 'products'

export const productsAPI = {
    getAll({ search = '', sort = 'popularity', tag = '', order = 'desc', page = 1, limit = 10, category = '', name_ne = '' }) {
        return API
            .get(
                `${BASE_URL}/list?name_like=${search}&_sort=${sort}&category_like=${category}&tags_like=${tag}&_order=${order}&_page=${page}&_limit=${limit}&name_ne=${name_ne}`
            )
    },
    getProductsByNewprice({ sort = 'newprice', order = 'desc', limit = 10, newprice_gte = 0 }) {
        return API
            .get(`${BASE_URL}?_sort=${sort}&_order=${order}&_limit=${limit}&newprice_gte=${newprice_gte}`)
    },
    findOne(slug = '') {
        return API.get(`${BASE_URL}/${slug}`)
    },
}
