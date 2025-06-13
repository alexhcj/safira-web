export const formatPrice = (price, currency = '$', locale = 'en-US') => {
	if (price === null || isNaN(price)) return `0.00 ${currency}`

	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: currency === '$' ? 'USD' : currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(price)
}
