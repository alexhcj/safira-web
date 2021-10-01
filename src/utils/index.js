// convert array into 2D dimensional
export const convertArray = (arr, quantity) => {
	return arr.reduce((cols, key, index) => {
		return (index % quantity === 0 ? cols.push([key]) : cols[cols.length - 1].push(key)) && cols
	}, [])
}

// concat url, size & ext into img url with sertain size
export const getSizedImgUrl = (url, imgSize = 'xl', ext = 'jpg') => {
	const sizeTypes = [
		{ id: 1, type: 'xs', size: '120x120' },
		{ id: 2, type: 'sm', size: '225x225' },
		{ id: 3, type: 'md', size: '270x270' },
		{ id: 4, type: 'md-lg', size: '326x280' },
		{ id: 5, type: 'lg', size: '326x326' },
		{ id: 6, type: 'xl', size: '600x600' },
		{ id: 7, type: 'offerlink', size: '590x140' },
		{ id: 8, type: 'specialoffer', size: '366x484' },
		{ id: 9, type: 'sale', size: '1920x440' },
	]

	const currentSize = sizeTypes.filter((sizeType) => sizeType.type === imgSize)[0].size

	return `${url}/${currentSize}.${ext}`
}
