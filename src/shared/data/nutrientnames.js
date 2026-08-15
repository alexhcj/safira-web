/**
 * Canonical spellings for the subset of micronutrients the UI singles out
 * for dedicated display (see NutritionalData FIELDS). This is NOT meant to
 * enumerate every possible micronutrient — `NutrientEntry.name` on the
 * backend stays free text so product data entry isn't blocked for
 * uncommon/exotic nutrients. This only fixes the names that MUST match
 * exactly between frontend lookups and backend seed data.
 */
export const NUTRIENT_NAME = Object.freeze({
	LINOLEIC_ACID: 'Linoleic acid',
	OMEGA_6: 'Omega 6',
	ALPHA_LINOLENIC_ACID: 'Alpha-linolenic acid',
	EPA_AND_DHA: 'EPA and DHA',
	OMEGA_3: 'Omega 3',
	VITAMIN_E: 'Vitamin E',
	VITAMIN_A: 'Vitamin A',
	VITAMIN_C: 'Vitamin C',
})

/**
 * Safely finds a micronutrient entry by canonical name. Never throws, even
 * if `micronutrients` is missing/undefined or nothing matches — returns
 * `undefined` instead so callers can distinguish "not provided" from "0".
 *
 * @param {{ name: string, amount: number, unit: string }[]|undefined} micronutrients
 * @param {string} name - canonical name, use NUTRIENT_NAME.* rather than a literal
 * @returns {{ amount: number, unit: string }|undefined}
 */
export const findMicronutrient = (micronutrients, name) => {
	const entry = micronutrients?.find((nutrient) => nutrient.name === name)
	return entry ? { amount: entry.amount, unit: entry.unit } : undefined
}
