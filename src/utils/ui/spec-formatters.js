/**
 * Small formatting helpers shared by every SpecTable adapter (Specifications
 * category specs, Shipping & Packaging, ...). Kept dumb on purpose — each
 * just turns a raw prop value into a display string, no domain logic.
 */

/** @param {number} value */
export const formatPercent = (value) => `${value}%`

/** @param {boolean} value */
export const formatBoolean = (value) => (value ? 'Yes' : 'No')

/** @param {string|number} value */
export const formatPlain = (value) => `${value}`

/**
 * @param {{ value: number, unit: string }} unitSize
 */
export const formatUnitSize = ({ value, unit }) => `${value}${unit}`

/**
 * @param {{ width: number, height: number, depth: number,  unit: string }} dimensions
 */
export const formatDimensions = ({ width, height, depth, unit }) => `${width} × ${height} × ${depth} ${unit}`
