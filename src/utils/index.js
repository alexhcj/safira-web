// convert array into 2D dimensional
export const convertArray = (arr, quantity) => {
	return arr.reduce((cols, key, index) => {
		return (index % quantity === 0 ? cols.push([key]) : cols[cols.length - 1].push(key)) && cols
	}, [])
}
export const makeUniqueArray = (products) => {
	const arr = []
    products.map((product) => {
      return arr.push(product.id)
    })
    const arrHelper = []
    for(let i=0;i<arr.length;i++){
        for(let l=i+1;l<arr.length;l++){
            if(arr[i]===arr[l]||arr[l]){
                arrHelper.push(l)
            }
        }
    }
    for(let k=0, reducer=0;k<arrHelper.length;k++,reducer--){
        products.splice(arrHelper[k]-reducer, 1)
    }
    return products
}
