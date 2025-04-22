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
 *
 * @returns {(function(*): (string|null))|*}
 */
export const passwordStrength = () => (value) => {
	if (!value) return 'Password is required'
	if (value.length < 6) return 'Password is too short'
	if (!/[A-Z]/.test(value)) return 'Use at least one uppercase letter'
	if (!/[0-9]/.test(value)) return 'Include at least one number'
	if (!/[!@#$%^&*]/.test(value)) return 'Include at least one special character'
	return null
}
