import { instance } from '.'

export const postsAPI = {
	getPosts(_limit = 3) {
		return instance.get(`posts?${_limit}`).then((res) => res.data)
	},
}
