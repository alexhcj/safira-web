// convert array into 2D dimensional
export const convertArray = (arr, quantity) => {
	return arr.reduce((cols, key, index) => {
		return (index % quantity === 0 ? cols.push([key]) : cols[cols.length - 1].push(key)) && cols
	}, [])
}

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

// concat url, size & ext into img url with certain size
export const getSizedImgUrl = (url, imgSize = 'xl', ext = 'jpg', index) => {
	const currentSize = imgSizeTypes.filter((sizeType) => sizeType.type === imgSize)[0].size

	return `${url}/${currentSize}${index ? `-${index}` : ''}.${ext}`
}

// types: 'digit' | 'full' | 'full-time'
export const convertISODate = (date, type = 'digit', locale = 'en') => {
	const convertedDate = new Date(date)
	const year = convertedDate.getFullYear()
	const month =
		type === 'digit'
			? convertedDate.toLocaleString(locale || 'default', { month: '2-digit' })
			: convertedDate.toLocaleString(locale || 'default', { month: 'long' })
	const day = convertedDate.getDate()
	const time = type === 'full-time' && convertedDate.toLocaleString(locale || 'default', { timeStyle: 'short' })

	switch (type) {
		case 'digit':
			return `${day}/${month}/${year}`
		case 'full':
			return `${month} ${day}, ${year}`
		case 'full-time':
			return `${month} ${day}, ${year} at ${time}`
	}
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

export const enumToCapitalizedString = (str) => {
	return str
		.toLowerCase()
		.split('_')
		.map((word, index) => (index !== 0 ? word[0].toUpperCase() + word.slice(1) : word))
		.join(' ')
}

export const enumToDashString = (str) => {
	return str.toLowerCase().split('_').join('-')
}

export const enumToCamelCase = (str) => {
	return str
		.toLowerCase()
		.split('_')
		.map((word, index) => (index !== 0 ? word[0].toUpperCase() + word.slice(1) : word))
		.join('')
}

export const brandToSlug = (brand) => {
	return brand.replace(/\s+/g, '-')
}

export const capitalizeFirstLetter = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1)
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

export const shallowEqual = (obj1, obj2) => {
	const keys1 = Object.keys(obj1)
	const keys2 = Object.keys(obj2)

	if (keys1.length !== keys2.length) {
		return false
	}

	for (let key of keys1) {
		if (obj1[key] !== obj2[key]) {
			return false
		}
	}

	return true
}

export const deepCount = (arr) => {
	let comments = []

	const flattenMembers = arr.map((item) => {
		if (item.comments && item.comments.length) {
			comments = [...comments, ...item.comments]
		}
		return item
	})

	return flattenMembers.concat(comments.length ? deepCount(comments) : comments)
}

export const compareObjectsShallow = (obj1, obj2) => {
	const keys1 = Object.keys(obj1)
	const keys2 = Object.keys(obj2)

	if (keys1.length !== keys2.length) {
		return false
	}

	for (let key of keys1) {
		if (obj1[key] !== obj2[key]) {
			return false
		}
	}

	return true
}

export const hideEmailPartial = (email) => {
	return email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, '$1***@$2')
}
