import { removeTrailingDot } from '@/utils'

import { SpecTable } from '@shared/components/SpecTable/SpecTable'
import { buildCategorySpecRows } from '@shared/data/category-specs'

import s from './core-specifications.module.scss'

/**
 * @typedef {Object} ShelfLife
 * @property {number|string} value
 * @property {string} unit
 */

/**
 * @typedef {Object} Ingredient
 * @property {string} name
 * @property {number} order
 */

/**
 * @typedef {Object} StorageInformation
 * @property {string} instructions
 * @property {number} [maxTempCelsius]
 */

/**
 * @typedef {Object} AlcoholicBeverageSpecs
 * @property {'alcoholicBeverage'} specArchetype
 * @property {number} abv - percent, 0-100
 * @property {string} [beverageStyle]
 * @property {string} [flavour]
 */

/**
 * @typedef {Object} NonAlcoholicBeverageSpecs
 * @property {'nonAlcoholicBeverage'} specArchetype
 * @property {boolean} [isFromConcentrate]
 * @property {boolean} [addedSugar]
 */

/**
 * @typedef {Object} PerishableProteinSpecs
 * @property {'perishableProtein'} specArchetype
 * @property {string} [farmedOrWild]
 * @property {string} [cut]
 * @property {boolean} isFrozen
 * @property {boolean} boneIn
 */

/**
 * @typedef {Object} PackagedCountSpecs
 * @property {'packagedCount'} specArchetype
 * @property {string} [gradeOrSize]
 */

/**
 * @typedef {Object} CookingOilSpecs
 * @property {'cookingOil'} specArchetype
 * @property {string} [extractionMethod]
 * @property {string} [oilType]
 * @property {number} [acidityPercent]
 */

/**
 * @typedef {Object} PreservedFoodSpecs
 * @property {'preservedFood'} specArchetype
 * @property {string} [packingMedium]
 * @property {string} [drainedWeight]
 */

/**
 * @typedef {AlcoholicBeverageSpecs|NonAlcoholicBeverageSpecs|PerishableProteinSpecs|PackagedCountSpecs|CookingOilSpecs|PreservedFoodSpecs} CategorySpecs
 */

/**
 * Product specifications table. All fields except `storageInformation` are
 * optional and simply omitted from the table when not provided.
 *
 * `categorySpecs` (discriminated by `specArchetype`) renders as a second,
 * visually-joined table directly below the main one — same tab, not a
 * separate one, since these fields are still "what is this product"
 * information the customer expects to find under Specifications.
 *
 * @param {Object} props
 * @param {{ displayName: string }} [props.company]
 * @param {string} [props.producingCountry]
 * @param {ShelfLife} [props.shelfLife]
 * @param {Ingredient[]} [props.ingredients]
 * @param {StorageInformation} props.storageInformation
 * @param {CategorySpecs} [props.categorySpecs]
 */
export const CoreSpecifications = ({
	company,
	producingCountry,
	shelfLife,
	ingredients,
	storageInformation,
	categorySpecs,
}) => {
	const rows = [
		company && {
			key: 'company',
			label: 'Company',
			value: company.displayName,
		},
		producingCountry && {
			key: 'producingCountry',
			label: 'Producing country',
			value: producingCountry,
		},
		shelfLife && {
			key: 'shelfLife',
			label: 'Shelf life',
			value: `${shelfLife.value} (${shelfLife.unit})`,
		},
		ingredients &&
			ingredients.length !== 0 && {
			key: 'ingredients',
			label: 'Ingredients',
			value: <div className={s.ingredient_list}>{ingredients.map(({ name }) => name).join(', ')}</div>,
		},
		storageInformation &&
			storageInformation.instructions && {
			key: 'storageInstructions',
			label: 'Storage information',
			value: removeTrailingDot(storageInformation.instructions),
		},
		storageInformation &&
			storageInformation.maxTempCelsius && {
			key: 'maxTemp',
			label: 'Maximum temperature',
			value: `${storageInformation.maxTempCelsius}°C`,
		},
	].filter(Boolean)

	const categoryRows = buildCategorySpecRows(categorySpecs)

	return (
		<>
			<SpecTable rows={rows} />
			{categoryRows.length > 0 && <SpecTable rows={categoryRows} className={s.category_table} />}
		</>
	)
}
