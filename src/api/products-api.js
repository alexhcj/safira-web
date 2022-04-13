import { instance } from '.'

const BASE_URL = 'products/list'

export const productsAPI = {
    getProducts({ search = '', sort = 'popularity', tag = '', order = 'desc', page = 1, limit = 10, category = '', name_ne = '' }) {
        return instance
            .get(
                `${BASE_URL}?name_like=${search}&_sort=${sort}&category_like=${category}&tags_like=${tag}&_order=${order}&_page=${page}&_limit=${limit}&name_ne=${name_ne}`
            )
            .then((res) => {
                return {
                    data: res.data,
                    total: Number(res.headers['x-total-count']),
                }
            })
    },
    getProductsByNewprice({ sort = 'newprice', order = 'desc', limit = 10, newprice_gte = 0 }) {
        return instance
            .get(`products?_sort=${sort}&_order=${order}&_limit=${limit}&newprice_gte=${newprice_gte}`)
            .then((res) => {
                return {
                    data: res.data,
                    total: Number(res.headers['x-total-count']),
                }
            })
    },
    getProduct(id = 1) {
        return instance.get(`products?id=${id}`).then((res) => res.data)
    },
}
