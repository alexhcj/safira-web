import { instance } from '.'

export const categoriesAPI = {
	getCategories() {
		return instance.get('categories').then((res) => res.data)
	},
}
