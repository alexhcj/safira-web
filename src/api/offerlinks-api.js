import { instance } from '.'

export const offerLinksAPI = {
	getOffers() {
		return instance.get('offer-links').then((res) => res.data)
	},
}
