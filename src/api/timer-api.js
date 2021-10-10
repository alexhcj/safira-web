import { instance } from '.'

export const timerAPI = {
	getDate() {
		return instance.get('timer').then((res) => res.data)
	},
}
