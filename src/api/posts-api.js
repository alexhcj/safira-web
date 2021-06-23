import { instance } from '.'

export const postsAPI = {
	getPosts() {
		return instance.get('blogPosts').then((res) => res.data)
	},
}
