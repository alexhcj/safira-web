import React, { useEffect, useState } from 'react'
import { productsAPI } from '../../../api/products'
import { RowSlider } from '../../../shared/components/Slider/RowSlider/RowSlider'
import { ProductCard } from '../../ProductCard/ProductCard'
import { convertArray } from '../../../utils'

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

	const items = convertArray(bestsellers, 2).map((col, index) => {
		return (
			<div key={index} style={{ padding: '0 10px' }}>
				{col.map((product) => {
					return <ProductCard size='xs' imgSize='xs' key={product.slug} product={product} />
				})}
			</div>
		)
	})

	const responsive = {
		0: {
			items: 2,
		},
	}

	return <RowSlider title='Best sellers' items={items} responsive={responsive} />
}
