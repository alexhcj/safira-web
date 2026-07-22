/**
 * Static, human-readable labels for routes whose display name cannot be
 * derived from the slug alone (special characters, casing, abbreviations,
 * marketing copy, etc).
 *
 * Keyed by the raw slug (a single path segment, no leading/trailing slashes).
 * If a slug isn't listed here, callers should fall back to a generic
 * slug -> string transform (e.g. `slugToStr`).
 *
 * NOTE: this only covers *static* routes (about, legal pages, etc). Shop
 * category labels must NOT go through this file — categories should always
 * come from the categories data source (see `getCategoryLabel` in
 * `breadcrumbLabel.js`), since that's the only place the correctly
 * formatted `name` (e.g. with `&`) actually lives.
 */
export const ROUTE_LABELS = {
	'terms-conditions': 'Terms & Conditions',
	// Add further static overrides here as they're discovered.
}
