import { formatBoolean, formatPercent, formatPlain, formatUnitSize } from '@utils/ui/spec-formatters'

/**
 * Mirrors the backend `specArchetype` discriminator values used by
 * CategorySpecsBase subclasses. Keep in sync with the backend `SpecArchetype`
 * enum by hand — same caveat as NUTRIENT_NAME, no shared package between the
 * JS frontend and TS backend yet.
 */
export const SPEC_ARCHETYPE = Object.freeze({
	ALCOHOLIC_BEVERAGE: 'alcoholicBeverage',
	NON_ALCOHOLIC_BEVERAGE: 'nonAlcoholicBeverage',
	PERISHABLE_PROTEIN: 'perishableProtein',
	PACKAGED_COUNT: 'packagedCount',
	COOKING_OIL: 'cookingOil',
	PRESERVED_FOOD: 'preservedFood',
})

/**
 * Per-archetype field config: [key, web label, formatter].
 * This is the single place that defines category-spec naming + units —
 * add a new archetype here, nothing else needs to change.
 */
const CATEGORY_SPEC_FIELDS = {
	[SPEC_ARCHETYPE.ALCOHOLIC_BEVERAGE]: [
		['abv', 'ABV', formatPercent],
		['beverageStyle', 'Beverage style', formatPlain],
		['flavour', 'Flavour', formatPlain],
	],
	[SPEC_ARCHETYPE.ALCOHOLIC_BEVERAGE]: [
		['isFromConcentrate', 'ABV', formatBoolean],
		['addedSugar', 'Beverage style', formatBoolean],
	],
	[SPEC_ARCHETYPE.PERISHABLE_PROTEIN]: [
		['farmedOrWild', 'Farmed', formatBoolean],
		['cut', 'Cut', formatPlain],
		['isFrozen', 'Frozen', formatBoolean],
		['boneIn', 'Bone-in', formatBoolean],
	],
	[SPEC_ARCHETYPE.PACKAGED_COUNT]: [['gradeOrSize', 'Grade / size', formatPlain]],
	[SPEC_ARCHETYPE.COOKING_OIL]: [
		['extractionMethod', 'Extraction method', formatPlain],
		['oilType', 'Type', formatPlain],
		['acidityPercent', 'Acidity percent', formatPercent],
	],
	[SPEC_ARCHETYPE.PRESERVED_FOOD]: [
		['packingMedium', 'Packing medium', formatPlain],
		['drainedWeight', 'Drained weight', formatUnitSize],
	],
}

/**
 * Builds SpecTable rows for a product's category-specific specs, based on
 * its `specArchetype` discriminator. Safe to call with `undefined`, and
 * safe to call with an archetype the frontend doesn't recognize yet (e.g.
 * backend shipped a new category before the frontend was updated) — both
 * just produce no extra rows instead of throwing.
 *
 * Filters on `!== undefined && !== null` rather than truthiness, so
 * booleans like `isFrozen: false` still render as "No" instead of being
 * dropped.
 *
 * @param {import('./Specifications').CategorySpecs} [categorySpecs]
 * @returns {import('@shared/components/SpecTable/SpecTable').SpecRow[]}
 */
export const buildCategorySpecRows = (categorySpecs) => {
	if (!categorySpecs) return []

	const fields = CATEGORY_SPEC_FIELDS[categorySpecs.specArchetype]
	if (!fields) return []

	return fields
		.filter(([key]) => categorySpecs[key] !== undefined && categorySpecs[key] !== null)
		.map(([key, label, format]) => ({
			key: `categorySpec_${key}`,
			label,
			value: format(categorySpecs[key]),
		}))
}
