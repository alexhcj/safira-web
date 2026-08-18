import { SpecTable } from '@shared/components/SpecTable/SpecTable'
import { buildShippingAndPackagingRows } from '@shared/data/shipping-and-packaging-fields'

/**
 * @typedef {Object} UnitSize
 * @property {number} value
 * @property {string} unit
 */

/**
 * @typedef {Object} Dimensions
 * @property {number} width
 * @property {number} height
 * @property {number} depth
 * @property {string} unit
 */

/**
 * @typedef {Object} Packaging
 * @property {number} unitsPerPack - 1 for a solo item, 6 for a 6-pack, etc.
 * @property {UnitSize} [unitSize] - size of a single unit inside the pack
 * @property {string} [packagingType] - e.g. 'can', 'bottle', 'carton', 'tray'
 * @property {string} [pricingUnit] - e.g. 'per-item', 'per-100g', 'per-pack'
 */

/**
 * @typedef {Object} ShippingDetails
 * @property {UnitSize} [weight] - total shipped weight
 * @property {Dimensions} [dimensions]
 */

/**
 * "Shipping & Packaging" tab: physical logistics info — how the product is
 * packed and shipped. Deliberately separate from Specifications' category
 * specs, which describe product identity/how it's sold (e.g. a packagedCount
 * product's "count per pack" is a retail attribute, not shipping data — see
 * shippingAndPackagingFields.js for the label-naming rationale).
 *
 * Renders nothing if there's no meaningful data to show.
 *
 * @param {Object} props
 * @param {Packaging} props.packaging
 * @param {ShippingDetails} [props.shippingDetails]
 */
export const ShippingAndPackaging = ({ packaging, shippingDetails }) => {
	const rows = buildShippingAndPackagingRows(packaging, shippingDetails)

	if (rows.length === 0) return null

	return <SpecTable rows={rows} />
}
