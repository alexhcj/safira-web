import {API} from "./api";

const BASE_URL = 'dealsweek';

export const dealsweekAPI = {
	findOne() {
		return API.get(`${BASE_URL}`)
	},
}
