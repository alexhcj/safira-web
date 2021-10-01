import { instance } from '.'

export const dealWeekAPI = {
	getDeal() {
		return instance.get('deal-week').then((res) => res.data)
	},
}
