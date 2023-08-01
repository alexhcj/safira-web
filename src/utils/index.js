// convert array into 2D dimensional
export const convertArray = (arr, quantity) => {
	return arr.reduce((cols, key, index) => {
		return (index % quantity === 0 ? cols.push([key]) : cols[cols.length - 1].push(key)) && cols
	}, [])
}

export const imgSizeTypes = [
	{ id: 1, type: 'xxs', size: '75x53' },
	{ id: 1, type: 'xs', size: '120x120' },
	{ id: 2, type: 'sm', size: '225x225' },
	{ id: 3, type: 'md', size: '270x270' },
	{ id: 4, type: 'md-lg', size: '326x280' },
	{ id: 5, type: 'lg', size: '326x326' },
	{ id: 6, type: 'xl', size: '600x600' },
	{ id: 7, type: 'offer-link', size: '590x140' },
	{ id: 8, type: 'special', size: '366x484' },
	{ id: 9, type: 'blog-post', size: '870x550' },
	{ id: 10, type: 'sale', size: '1920x440' },
	{ id: 11, type: 'shop', size: '255x430' },
]

// concat url, size & ext into img url with certain size
export const getSizedImgUrl = (url, imgSize = 'xl', ext = 'jpg') => {
	const currentSize = imgSizeTypes.filter((sizeType) => sizeType.type === imgSize)[0].size

	return `${url}/${currentSize}.${ext}`
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

export const convertISODate = (date, type) => {
	const convertedDate = new Date(date)
	const year = convertedDate.getFullYear()
	const month =
		type === 'post'
			? convertedDate.toLocaleString('default', { month: '2-digit' })
			: convertedDate.toLocaleString('default', { month: 'long' })
	const day = convertedDate.getDate()
	return type === 'post' ? `${day}/${month}/${year}` : `${month} ${day}, ${year}`
}

export const calculateTotalPrice = (arr) => {
	return arr.reduce((total, item) => {
		/* eslint-disable no-param-reassign */
		return (total += item.price * item.quantity)
	}, 0)
}

export const stringToSlug = (str) => {
	return str.split(' ').join('-').toLowerCase()
}

export const slugToString = (str) => {
	return str.split('-').join(' ')
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
