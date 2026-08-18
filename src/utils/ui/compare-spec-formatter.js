// Each entry either:
//  - returns a plain string/number  -> renders as ONE row named after the field
//  - returns a plain object         -> each key becomes its OWN row (flattened)
// Anything not listed here falls back to the old passthrough behavior
// (plain scalar fields like producingCountry).

const formatUnitSize = (unitSize) => (unitSize ? `${unitSize.value}${unitSize.unit}` : null)

const PRICING_UNIT_LABELS = {
	'per-item': 'Per item',
	'per-kg': 'Per kg',
	'per-100g': 'Per 100g',
	'per-pack': 'Per pack',
}

export const SPEC_FIELD_FORMATTERS = {
	company: (company) => (company ? company.displayName : '-'),
	shelfLife: (shelfLife) => (shelfLife ? `${shelfLife.value} ${shelfLife.unit}` : '-'),

	ingredients: (ingredients) =>
		ingredients && ingredients.length
			? ingredients
					.slice()
					.sort((a, b) => a.order - b.order)
					.map((i) => i.name)
					.join(', ')
			: '-',

	storageInformation: (storage) => {
		if (!storage) return '-'
		const temp = storage.maxTempCelsius !== null ? ` (≤${storage.maxTempCelsius}°C)` : ''
		return `${storage.instructions}${temp}`
	},

	// Flattened into one row per macro — comparing "nutritionalData: [object]"
	// as a single row is meaningless; comparing "Protein: 20g vs 6g" isn't.
	nutritionalData: (nutrition) => {
		if (!nutrition) return null // this product has no nutrition data at all — no rows added
		const { servingSize, energyKcal, protein, fat, carbohydrate, sodium, cholesterol, micronutrients } = nutrition
		return {
			servingSize: servingSize ? formatUnitSize(servingSize) : '-',
			energyKcal: energyKcal !== null ? `${energyKcal} kcal` : '-',
			protein: protein !== null ? `${protein} g` : '-',
			fatTotal: fat?.total !== null ? `${fat.total} g` : '-',
			fatSaturated: fat?.saturated !== null ? `${fat.saturated} g` : '-',
			carbTotal: carbohydrate?.total !== null ? `${carbohydrate.total} g` : '-',
			carbSugars: carbohydrate?.sugars !== null ? `${carbohydrate.sugars} g` : '-',
			carbFibre: carbohydrate?.fibre !== null ? `${carbohydrate.fibre} g` : '-',
			sodium: sodium !== null ? `${sodium} mg` : '-',
			cholesterol: cholesterol !== null ? `${cholesterol} mg` : '-',
			micronutrients:
				micronutrients && micronutrients.length
					? micronutrients.map((m) => `${m.name} ${m.amount}${m.unit}`).join(', ')
					: '-',
		}
	},

	// Discriminated union — shape depends on specArchetype, but one compare
	// list is always one basicCategory, so effectively one archetype at a
	// time. Every field except the discriminator itself becomes its own row.
	categorySpecs: (specs) => {
		if (!specs) return null
		const { specArchetype, ...rest } = specs
		const formatted = {}
		Object.entries(rest).forEach(([key, value]) => {
			if (value === null) {
				formatted[key] = '-'
				return
			}
			if (typeof value === 'boolean') {
				formatted[key] = value ? 'Yes' : 'No'
				return
			}
			if (key === 'drainedWeight' && typeof value === 'object') {
				formatted[key] = formatUnitSize(value)
				return
			}
			formatted[key] = String(value)
		})
		return formatted
	},

	packaging: (packaging) => {
		if (!packaging) return null
		return {
			unitsPerPack: packaging.unitsPerPack !== null ? String(packaging.unitsPerPack) : '-',
			unitSize: packaging.unitSize ? formatUnitSize(packaging.unitSize) : '-',
			packagingType: packaging.packagingType || '-',
			pricingUnit: packaging.pricingUnit ? PRICING_UNIT_LABELS[packaging.pricingUnit] || packaging.pricingUnit : '-',
		}
	},
}

// Merged-object key order isn't stable across renders/products — this
// keeps the table in a sensible, consistent order instead.
export const FIELD_ORDER = [
	'company',
	'producingCountry',
	'shelfLife',
	'ingredients',
	'storageInformation',
	'nutritionalData',
	'categorySpecs',
	'packaging',
]
