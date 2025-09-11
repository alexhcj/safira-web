/**
 * Convert DD/MM/YYYY to YYYY-MM-DD (date-only, no timezone)
 * @param {string} dateStr - Date string in DD/MM/YYYY format
 * @returns {string|null} YYYY-MM-DD ISO string or null if no date provided
 */
export const dateToISO = (dateStr) => {
	if (!dateStr) return null

	const [day, month, year] = dateStr.split('/')

	// Validate inputs
	if (!day || !month || !year) return null

	const dayNum = parseInt(day, 10)
	const monthNum = parseInt(month, 10)
	const yearNum = parseInt(year, 10)

	// Basic validation
	if (dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12 || yearNum < 1900) {
		return null
	}

	// Return ISO date string (no time, no timezone)
	return `${yearNum}-${monthNum.toString().padStart(2, '0')}-${dayNum.toString().padStart(2, '0')}`
}
