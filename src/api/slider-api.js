import { instance } from '.'

export const sliderAPI = {
	getSlides() {
		return instance.get('slider').then((res) => res.data)
	},
}
