export const imgSizeTypes = [
	{ type: 'avatar', size: '50x50' },
	{ type: 'category', size: '72x72' },
	{ type: 'xxs', size: '75x53' },
	{ type: 'xs', size: '120x120' },
	{ type: 'avatar-s', size: '150x150' },
	{ type: 'sm', size: '225x225' },
	{ type: 'md', size: '270x270' },
	{ type: 'md-lg', size: '326x280' },
	{ type: 'lg', size: '326x326' },
	{ type: 'xl', size: '600x600' },
	{ type: 'offer-link', size: '590x140' },
	{ type: 'special', size: '366x484' },
	{ type: 'blog-post', size: '870x550' },
	{ type: 'promo', size: '1920x440' },
	{ type: 'hero-slider', size: '1920x550' },
	{ type: 'shop', size: '255x430' },
]

/**
 * Concat url, size and ext into img url with a certain size
 * @param {string} url - Base URL of the image
 * @param {string} imgSize - Size type of the image (defaults to 'xl')
 * @param {string} ext - File extension of the image (defaults to 'jpg')
 * @param {number} [index] - Optional index to append to filename
 */
export const getSizedImgUrl = (url, imgSize = 'xl', ext = 'jpg', index) => {
	const currentSize = imgSizeTypes.filter((sizeType) => sizeType.type === imgSize)[0].size

	return `${url}/${currentSize}${index ? `-${index}` : ''}.${ext}`
}
