/**
 * Count total nested comments
 * @param {array} arr - Array of comments
 * @returns {number} - Total comments
 */
export const countCommentsDeep = (arr) => {
	let comments = []

	const flattenMembers = arr.map((item) => {
		if (item.comments && item.comments.length) {
			comments = [...comments, ...item.comments]
		}
		return item
	})

	return flattenMembers.concat(comments.length ? countCommentsDeep(comments) : comments).length
}
