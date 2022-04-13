import { instance } from '.'

export const dealWeekAPI = {
	getDeal() {
		return instance.get('deals-week').then((res) => res.data)
	},
}
