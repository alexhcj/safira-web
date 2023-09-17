// convert array into 2D dimensional
export const convertArray = (arr, quantity) => {
	return arr.reduce((cols, key, index) => {
		return (index % quantity === 0 ? cols.push([key]) : cols[cols.length - 1].push(key)) && cols
	}, [])
}

export const imgSizeTypes = [
	{ id: 1, type: 'xxxs', size: '50x50' },
	{ id: 2, type: 'xxs', size: '75x53' },
	{ id: 3, type: 'xs', size: '120x120' },
	{ id: 4, type: 'sm', size: '225x225' },
	{ id: 5, type: 'md', size: '270x270' },
	{ id: 6, type: 'md-lg', size: '326x280' },
	{ id: 7, type: 'lg', size: '326x326' },
	{ id: 8, type: 'xl', size: '600x600' },
	{ id: 9, type: 'offer-link', size: '590x140' },
	{ id: 10, type: 'special', size: '366x484' },
	{ id: 11, type: 'blog-post', size: '870x550' },
	{ id: 12, type: 'sale', size: '1920x440' },
	{ id: 13, type: 'hero-slider', size: '1920x550' },
	{ id: 14, type: 'shop', size: '255x430' },
]

// concat url, size & ext into img url with certain size
export const getSizedImgUrl = (url, imgSize = 'xl', ext = 'jpg', index) => {
	const currentSize = imgSizeTypes.filter((sizeType) => sizeType.type === imgSize)[0].size

	return `${url}/${currentSize}${index ? `-${index}` : ''}.${ext}`
}

export const makeUniqueArray = (products) => {
	const arr = []
	products.map((product) => {
		return arr.push(product.id)
	})
	const arrHelper = []
	for (let i = 0; i < arr.length; i++) {
		for (let l = i + 1; l < arr.length; l++) {
			if (arr[i] === arr[l] || arr[l]) {
				arrHelper.push(l)
			}
		}
	}
	for (let k = 0, reducer = 0; k < arrHelper.length; k++, reducer--) {
		products.splice(arrHelper[k] - reducer, 1)
	}
	return products
}

// TODO: add full-time type (posts comments). Add - "at 1:38 am"
// types: 'digit' | 'full' | 'full-time'
export const convertISODate = (date, type = 'digit', locale = 'en') => {
	const convertedDate = new Date(date)
	const year = convertedDate.getFullYear()
	const month =
		type === 'digit'
			? convertedDate.toLocaleString(locale || 'default', { month: '2-digit' })
			: convertedDate.toLocaleString(locale || 'default', { month: 'long' })
	const day = convertedDate.getDate()
	return type === 'digit' ? `${day}/${month}/${year}` : `${month} ${day}, ${year}`
}

export const calculateTotalPrice = (arr) => {
	return arr.reduce((total, item) => {
		return (total += item.discount_price ? item.discount_price * item.quantity : item.price * item.quantity)
	}, 0)
}

export const stringToSlug = (str) => {
	return str.split(' ').join('-').toLowerCase()
}

export const slugToString = (str) => {
	return str.charAt(0).toUpperCase() + str.split('-').join(' ').slice(1)
}

export const enumToString = (str) => {
	return str.split('_').join(' ')
}

export const brandToSlug = (brand) => {
	return brand.replace(/\s+/g, '-')
}

export const throttle = (fn, ms) => {
	let wait = false
	return () => {
		if (!wait) {
			fn.call()
			wait = true
			setTimeout(() => {
				wait = false
			}, ms)
		}
	}
}

export const filterCharsOnly = (str) => {
	// return str.match(/[A-Za-z]/) ? str : new Error('Validation error')
	return str.match(/[A-Za-z]/)
}
