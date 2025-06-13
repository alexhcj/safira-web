/**
 *
 * @param {Date} date - The date to be converted
 * @param {string} type - The type of date to be converted { digit, full, full-time}
 * @param {string} locale - The locale of the date
 * @returns {string} The converted date
 */
// types: 'digit' | 'full' | 'full-time'
export const convertISODate = (date, type = 'digit', locale = 'en') => {
	const convertedDate = new Date(date)
	const year = convertedDate.getFullYear()
	const month =
		type === 'digit'
			? convertedDate.toLocaleString(locale || 'default', { month: '2-digit' })
			: convertedDate.toLocaleString(locale || 'default', { month: 'long' })
	const day = convertedDate.getDate()
	const time = type === 'full-time' && convertedDate.toLocaleString(locale || 'default', { timeStyle: 'short' })

	switch (type) {
		case 'digit':
			return `${day}/${month}/${year}`
		case 'full':
			return `${month} ${day}, ${year}`
		case 'full-time':
			return `${month} ${day}, ${year} at ${time}`
	}
}
