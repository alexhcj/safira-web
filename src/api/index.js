import axios from 'axios'

export const instance = axios.create({
	baseURL: 'http://localhost:5000/',
	withCredentials: true,
})

export { sliderAPI } from './slider-api'
export { offersAPI } from './offers-api'
export { postsAPI } from './posts-api'
export { saleAPI } from './sale-api'
export { dealweekAPI } from './dealweek-api'
export { specialofferAPI } from './specialoffer-api'
export { productsAPI } from './products-api'
export { categoriesAPI } from './categories-api'
export { shopProductsAPI } from './shopproducts-api'
export { shopbannerAPI } from './shopbanner-api'
export { blogCategoriesAPI } from './blogcategories-api'
