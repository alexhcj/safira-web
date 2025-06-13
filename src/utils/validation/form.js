/**
 *
 * @param msg
 * @returns {function(*): null|string}
 */
export const required =
	(msg = 'This field is required') =>
		(value) =>
		value ? null : msg

/**
 * Limit the min length of a string
 * @param {number} length - Minimum length
 * @param {string} msg - Error message
 * @returns {function(*): null|string}
 */
export const minLength =
	(length, msg = `Minimum ${length} characters`) =>
		(value) =>
		value.length >= length ? null : msg

/**
 * Limit the max length of a string
 * @param {number} length - Maximum length
 * @param {string} msg - Error message
 * @returns {function(*): null|string}
 */
export const maxLength =
	(length, msg = `Maximum ${length} characters`) =>
		(value) =>
		value.length <= length ? null : msg

/**
 *
 * @param regex
 * @param msg
 * @returns {function(*): null|*}
 */
export const pattern = (regex, msg) => (value) => (regex.test(value) ? null : msg)

/**
 *
 * @param targetField
 * @param msg
 * @returns {function(*, *): null|*}
 */
export const matchField = (targetField, msg) => (value, form) => (value === form?.[targetField] ? null : msg)

/**
 * Validates that a field has an exact length
 * @param {number} length - The exact length required
 * @param {string} message - Error message to display
 * @returns {function} Validation function
 */
export const exactLength = (length, message) => (value) => {
	if (!value) return null
	return String(value).length === length ? null : message
}
