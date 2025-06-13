/**
 * Converts a string to a URL-friendly slug
 * @param {string} str - The string to convert to slug
 * @returns {string} The slugified string
 */
export const strToSlug = (str) => {
	if (typeof str !== 'string') return ''
	return str.trim().split(' ').join('-').toLowerCase()
}

/**
 * Converts a slug back to a readable string with proper capitalization
 * @param {string} str - The slug to convert
 * @returns {string} The formatted string
 */
export const slugToStr = (str) => {
	if (typeof str !== 'string') return ''
	const words = str.trim().split('-').join(' ')
	return words.charAt(0).toUpperCase() + words.slice(1)
}

/**
 * Converts a camelCase string to a readable string with proper capitalization
 * @param {string} str - The camelCase string to convert
 * @returns {string} The formatted string
 */
export const camelToStr = (str) => {
	if (typeof str !== 'string') return ''
	const words = str.replace(/([A-Z])/g, ' $1').trim()
	return words.charAt(0).toUpperCase() + words.slice(1)
}

/**
 * Converts an enum string to a readable text by replacing underscores with spaces
 * @param {string} str - The enum string to convert
 * @returns {string} The formatted string
 */
export const enumToStr = (str) => {
	if (typeof str !== 'string') return ''
	return str.trim().split('_').join(' ')
}

/**
 * Converts an enum string to a dash-separated lowercase string
 * @param {string} str - The enum string to convert
 * @returns {string} The dash-separated lowercase string
 */
export const enumToDashStr = (str) => {
	if (typeof str !== 'string') return ''
	return str.trim().toLowerCase().split('_').join('-')
}

/**
 * Converts an enum string to camelCase format
 * @param {string} str - The enum string to convert
 * @returns {string} The camelCase formatted string
 */
export const enumToCamelCase = (str) => {
	if (typeof str !== 'string') return ''
	return str
		.toLowerCase()
		.split('_')
		.map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
		.join('')
}
