import { instance } from '.'

export const dealweekAPI = {
	getDeal() {
		return instance.get('dealweek').then((res) => res.data)
	},
}
