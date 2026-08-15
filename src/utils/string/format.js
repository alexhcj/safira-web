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
 * Capitalizes the first character only when it is a letter.
 * Returns the original value unchanged when it starts with a non-letter.
 *
 * @param {string} str - The string to format.
 * @returns {string} The formatted string.
 */
export const capitalizeIfStartsWithLetter = (str) => {
	if (!str || typeof str !== 'string') return str || ''

	return /^[A-Za-z]/.test(str) ? capitalize(str) : str
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

/**
 * Removes a trailing dot from a sentence, if present.
 *
 * @param {string} sentence - The sentence to process.
 * @returns {string} The sentence without a trailing dot.
 */
export const removeTrailingDot = (sentence) => {
	return sentence?.endsWith('.') ? sentence.slice(0, -1) : sentence
}
