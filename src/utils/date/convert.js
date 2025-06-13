/**
 * Convert date string in DD/MM/YYYY format to ISO date string
 * @param {string} dateStr - Date string in DD/MM/YYYY format
 * @returns {string|null} ISO date string or null if no date provided
 */
export const dateToISO = (dateStr) => {
	if (!dateStr) return null
	return new Date(dateStr.split('/').reverse().join('/')).toISOString()
}
