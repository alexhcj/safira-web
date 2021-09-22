import { instance } from '.'

export const hoursAPI = {
	getHours({ author = 'alex' }) {
		return instance.get(`hours?author_like=${author}`).then((res) => res.data)
	},
	updateHours(hours = 1) {
		return instance
			.put(`hours/1`, {
				id: 1,
				author: 'alex',
				hours: hours,
			})
			.then((res) => res.data)
	},
}
