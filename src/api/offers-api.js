import { instance } from '.'

export const offersAPI = {
	getOffers() {
		return instance.get('offers').then((res) => res.data)
	},
}
