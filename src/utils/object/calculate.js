/**
 * Count total nested comments recursively
 * @param {array} comments - Array of comments
 * @returns {number} - Total number of comments including all nested
 */
export const countCommentsDeep = (comments = []) => {
	let count = 0

	for (const comment of comments) {
		count += 1 // count this comment

		if (Array.isArray(comment.comments)) {
			count += countCommentsDeep(comment.comments) // count children
		}
	}

	return count
}
