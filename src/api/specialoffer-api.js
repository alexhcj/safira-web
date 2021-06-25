import { instance } from '.'

export const specialofferAPI = {
	getSpecialoffer() {
		return instance.get('specialoffer').then((res) => res.data)
	},
}
