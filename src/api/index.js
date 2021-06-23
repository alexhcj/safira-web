import axios from 'axios'

export const instance = axios.create({
	baseURL: 'http://localhost:5000/',
	withCredentials: true,
})

<<<<<<< HEAD
export { sliderAPI } from './slider-api'
export { offersAPI } from './offers-api'
=======

export {sliderAPI} from './slider-api'
export {offersAPI} from './offers-api'
export {postsAPI} from './posts-api'
>>>>>>> 22c26d89c9d616dfc72a686c28144f145c070ae4
