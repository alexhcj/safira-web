import React, { useEffect, useState } from 'react'
import { productsAPI } from '../../../api/products'
import { RowSlider } from '../../../shared/components/Slider/RowSlider/RowSlider'

export const BestSellers = () => {
	const [bestsellers, setBestsellers] = useState([])

	useEffect(() => {
		const params = {
			sort: 'popularity',
			limit: 8,
		}

		const fetchData = async () => {
			try {
				const { products } = await productsAPI.getAll(params)
				setBestsellers(products)
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [])

	const responsive = {
		0: {
			items: 2,
		}
	}

	return (
		<RowSlider
			title="Best sellers"
			array={bestsellers}
			level={2}
			productSize="xs"
			productImgSize="xs"
			responsive={responsive}
		/>
	)
}
