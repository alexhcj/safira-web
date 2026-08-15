import { SpecTable } from '@shared/components/SpecTable/SpecTable'

/**
 * @typedef {Object} NutrientValue
 * @property {number|undefined} amount
 * @property {string} unit - e.g. 'g', 'mg', 'kcal', 'mcg'
 */

/**
 * @typedef {Object} NutritionalValues
 * @property {NutrientValue} [energy]
 * @property {NutrientValue} [protein]
 * @property {NutrientValue} [totalFat]
 * @property {NutrientValue} [saturatedFat]
 * @property {NutrientValue} [monounsaturatedFat]
 * @property {NutrientValue} [polyunsaturatedFat]
 * @property {NutrientValue} [transFat]
 * @property {NutrientValue} [linoleicAcid]
 * @property {NutrientValue} [omega6]
 * @property {NutrientValue} [alphaLinoleinicAcid]
 * @property {NutrientValue} [epaAndDha]
 * @property {NutrientValue} [omega3]
 * @property {NutrientValue} [cholesterol]
 * @property {NutrientValue} [carbohydrate]
 * @property {NutrientValue} [sugars]
 * @property {NutrientValue} [dietaryFibre]
 * @property {NutrientValue} [sodium]
 * @property {NutrientValue} [vitaminE]
 * @property {NutrientValue} [vitaminA]
 * @property {NutrientValue} [vitaminC]
 */

/**
 * Ordered [key, label] pairs used to build table rows from NutritionalValues.
 * Units are NOT hardcoded here — they come from the value itself, since
 * micronutrient entries carry their own unit and shouldn't be assumed.
 */
const FIELDS = [
	['energy', 'Energy'],
	['protein', 'Protein'],
	['totalFat', 'Total Fat'],
	['saturatedFat', 'Saturated Fat'],
	['monounsaturatedFat', 'Monounsaturated Fat'],
	['polyunsaturatedFat', 'Polyunsaturated Fat'],
	['transFat', 'Trans Fat'],
	['linoleicAcid', 'Linoleic Acid'],
	['omega6', 'Omega 6'],
	['alphaLinoleinicAcid', 'Alpha-Linoleinic Acid'],
	['epaAndDha', 'EPA and DHA'],
	['omega3', 'Omega 3'],
	['cholesterol', 'Cholesterol'],
	['carbohydrate', 'Carbohydrate'],
	['sugars', 'Sugars'],
	['dietaryFibre', 'Dietary Fibre'],
	['sodium', 'Sodium'],
	['vitaminE', 'Vitamin E'],
	['vitaminA', 'Vitamin A'],
	['vitaminC', 'Vitamin C'],
]

/**
 * Renders the per-serving "Nutritional data" table. A field is skipped
 * entirely (not shown as "0" or "-") when its amount is missing, so callers
 * can safely pass values built from an incomplete/free-text micronutrients
 * array without needing to pre-filter anything themselves.
 *
 * @param {Object} props
 * @param {NutritionalValues} props.values - per-serving nutritional values
 * @param {string|number} props.servingSize - e.g. `"50g"`, shown in the column header
 */
export const NutritionalDataSpecifications = ({ values, servingSize }) => {
	const rows = FIELDS.filter(([key]) => values[key]?.amount !== undefined && values[key]?.amount !== null).map(
		([key, label]) => ({
			key,
			label,
			value: `${values[key].amount}${values[key].unit}`,
		}),
	)

	return <SpecTable rows={rows} headers={['Attributes', `Per Serving (${servingSize})`]} />
}
