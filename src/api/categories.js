import {API} from "./api";

const BASE_URL = 'categories';

export const categoriesAPI = {
	getAll() {
		return API.get(`${BASE_URL}`)
	},
}
