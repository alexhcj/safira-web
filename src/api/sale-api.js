import { instance } from '.'

export const saleAPI = {
	getSale() {
		return instance.get('sale').then((res) => res.data)
	},
}
