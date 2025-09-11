/**
 * Convert a date string (YYYY-MM-DD or ISO datetime) to a formatted string.
 *
 * @param {string|Date} dateInput - An ISO datetime string (`YYYY-MM-DDTHH:mm:ssZ`) or input date in `YYYY-MM-DD` format.
 * @param {'digit' | 'full' | 'full-time'} [type='digit'] - The output format type:
 *   - `'digit'`: returns `DD/MM/YYYY`
 *   - `'full'`: returns `Month DD, YYYY` (e.g., `January 5, 2025`).
 *   - `'full-time'`: returns `Month DD, YYYY at HH:mm` (e.g., `January 5, 2025 at 08:39 am`).
 * @param {'en' | 'es' | 'tr'} [locale='en'] - The locale for formatting (currently unused, reserved for future i18n support).
 * @returns {string} The formatted date string, or an empty string if input is invalid.
 */
export const convertISODate = (dateInput, type = 'digit', locale = 'en') => {
	if (!dateInput) return ''

	let dateObj
	let year, month, day

	// Handle different input types
	if (typeof dateInput === 'string') {
		// Handle both "YYYY-MM-DD" and full ISO datetime strings
		if (dateInput.includes('T')) {
			// Full ISO datetime string like "2023-12-25T14:30:00.000Z"
			dateObj = new Date(dateInput)
		} else {
			// Date-only string like "2023-12-25"
			// Parse manually to avoid timezone issues for date-only strings
			const [yearStr, monthStr, dayStr] = dateInput.split('-')
			year = parseInt(yearStr, 10)
			month = parseInt(monthStr, 10)
			day = parseInt(dayStr, 10)

			// For full-time format with date-only input, we can't show time
			if (type === 'full-time') {
				console.warn('full-time format requested but input has no time information')
				type = 'full' // Fallback to full format
			}
		}
	} else if (dateInput instanceof Date) {
		dateObj = dateInput
	} else {
		console.error('Invalid dateInput type:', typeof dateInput)
		return ''
	}

	// Extract date parts if we have a Date object
	if (dateObj && !isNaN(dateObj.getTime())) {
		year = dateObj.getFullYear()
		month = dateObj.getMonth() + 1 // getMonth() is 0-indexed
		day = dateObj.getDate()
	}

	// Validate extracted values
	if (!year || !month || !day || isNaN(year) || isNaN(month) || isNaN(day)) {
		console.error('Invalid date parts extracted:', { year, month, day, input: dateInput })
		return ''
	}

	// Month names for full format
	const monthNames = {
		en: [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		],
		es: [
			'Enero',
			'Febrero',
			'Marzo',
			'Abril',
			'Mayo',
			'Junio',
			'Julio',
			'Agosto',
			'Septiembre',
			'Octubre',
			'Noviembre',
			'Diciembre',
		],
		tr: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
	}

	const monthNamesArray = monthNames[locale] || monthNames.en
	const monthName = monthNamesArray[month - 1]

	switch (type) {
		case 'digit':
			return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`

		case 'full':
			return `${monthName} ${day}, ${year}`

		case 'full-time': {
			if (!dateObj) {
				// This shouldn't happen due to earlier check, but just in case
				return `${monthName} ${day}, ${year}`
			}

			// Format time using the Date object
			const timeOptions = {
				hour: '2-digit',
				minute: '2-digit',
				hour12: true, // Use 12-hour format, change to false for 24-hour
			}

			let timeString
			try {
				timeString = dateObj.toLocaleTimeString(locale === 'en' ? 'en-US' : locale, timeOptions)
			} catch (error) {
				// Fallback if locale is not supported
				timeString = dateObj.toLocaleTimeString('en-US', timeOptions)
			}

			return `${monthName} ${day}, ${year} at ${timeString}`
		}

		default:
			return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`
	}
}
