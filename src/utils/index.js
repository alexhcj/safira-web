// convert array into 2D dimensional
export const convertArray = (arr) => {
	return arr.reduce((cols, key, index) => {
		return (index % 2 === 0 ? cols.push([key]) : cols[cols.length - 1].push(key)) && cols
	}, [])
}
