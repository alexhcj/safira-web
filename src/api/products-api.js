import { instance } from '.'

export const productsAPI = {
	getBestsellers() {
		return instance.get('products').then((res) => res.data)
	},
}
