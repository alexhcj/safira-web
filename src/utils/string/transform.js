import { ROUTE_LABELS } from '@shared/data/route-labels'

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

/**
 * Resolves the label to display for a single breadcrumb segment.
 *
 * Precedence (highest to lowest):
 *  1. `categoryName` - an already-correctly-formatted name coming from the
 *     categories data source (dropdown, shop page, or - once wired up on the
 *     product card side - a categories lookup by slug). This is the only
 *     place `&` and similar formatting should ever come from.
 *  2. `ROUTE_LABELS[slug]` - static route overrides (e.g. legal pages).
 *  3. `slugToStr(slug)` - naive fallback for anything not explicitly known.
 *
 * This function exists so that a given slug renders identically no matter
 * which navigation path produced it (dropdown click, product card click, or
 * direct URL entry).
 *
 * @param {string} slug - raw url segment, e.g. "privacy-policy"
 * @param {string} [categoryName] - pre-formatted name, if already known
 * @returns {string} the label to render
 */
export const getBreadcrumbLabel = (slug, categoryName) => {
	if (categoryName) return categoryName
	if (ROUTE_LABELS[slug]) return ROUTE_LABELS[slug]
	return slugToStr(slug)
}

/**
 * Safely parses the JSON-stringified `location.state` used by this app's
 * navigate() calls. Returns `null` for anything falsy or unparsable instead
 * of throwing, since `state` is legitimately absent on plenty of routes.
 *
 * @param {string | undefined | null} state
 * @returns {object | null}
 */
export const safeParseState = (state) => {
	if (!state) return null
	try {
		return JSON.parse(state)
	} catch {
		return null
	}
}
