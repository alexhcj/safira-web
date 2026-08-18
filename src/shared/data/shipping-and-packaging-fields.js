import { formatDimensions, formatPlain, formatUnitSize } from '@utils/ui/spec-formatters'

/**
 * Deliberately labeled "Units per pack" (not "Count per pack") — Specifications'
 * packagedCount archetype already uses "Count per pack" for a related but
 * distinct concept (how the product is sold vs how it's physically packed).
 * Keeping the labels visibly different avoids the two tabs looking redundant.
 */
const PACKAGING_FIELDS = [
	['unitsPerPack', 'Units per pack', formatPlain],
	['unitSize', 'Unit size', formatUnitSize],
	['packagingType', 'Packaging type', formatPlain],
	['pricingUnit', 'Pricing unit', formatPlain],
]

const SHIPPING_FIELDS = [
	['weight', 'Shipping weight', formatUnitSize],
	['dimensions', 'Dimensions', formatDimensions],
]

const buildRows = (source, fields, keyPrefix) =>
	fields
		.filter(([key]) => source?.[key] !== undefined && source?.[key] !== null)
		.map(([key, label, format]) => ({
			key: `${keyPrefix}_${key}`,
			label,
			value: format(source[key]),
		}))

/**
 * @param {import('./ShippingAndPackaging').Packaging} packaging
 * @param {import('./ShippingAndPackaging').ShippingDetails} [shippingDetails]
 * @returns {import('@shared/components/SpecTable/SpecTable').SpecRow[]}
 */
export const buildShippingAndPackagingRows = (packaging, shippingDetails) => [
	...buildRows(packaging, PACKAGING_FIELDS, 'packaging'),
	...buildRows(shippingDetails, SHIPPING_FIELDS, 'shipping'),
]
