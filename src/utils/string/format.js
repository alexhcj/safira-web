/**
 * Hides 3 letters of email
 * @param {string} email - Email to be hidden
 * @returns {string} - Hidden email
 */
export const hideEmailPartial = (email) => {
	return email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, '$1***@$2')
}

/**
 * Capitalizes the first letter of a string
 * @param {string} str - The string to capitalize
 * @returns {string} The capitalized string
 */
export const capitalize = (str) => {
	if (!str || typeof str !== 'string') return ''
	return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Transforms a string into title case format (capitalizes the first letter of each word)
 * @param {string} str - The string to transform into title case
 * @returns {string} The title case formatted string
 */
export const titleCase = (str) => {
	if (!str || typeof str !== 'string') return ''
	return str.toLowerCase().split(' ').map(capitalize).join(' ')
}
