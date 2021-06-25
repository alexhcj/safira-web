import { instance } from '.'

export const postsAPI = {
	getPosts() {
		return instance.get('posts').then((res) => res.data)
	},
}
