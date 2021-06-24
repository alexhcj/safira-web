import axios from 'axios'

export const instance = axios.create({
	baseURL: 'http://localhost:5000/',
	withCredentials: true,
})

export { sliderAPI } from './slider-api'
export { offersAPI } from './offers-api'
export { postsAPI } from './posts-api'
