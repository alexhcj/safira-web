/**
 * Checks if a string contains only alphabetical characters
 * @param {string} str - The string to validate
 * @returns {boolean} True if string contains only alphabetical characters, false otherwise
 */
export const filterCharsOnly = (str) => {
	// return str.match(/[A-Za-z]/) ? str : new Error('Validation error')
	return str.match(/[A-Za-z]/)
}
