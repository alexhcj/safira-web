import React, { useEffect, useState } from 'react'
import { productsAPI } from '../../../api/products'
import { RowSlider } from '../../../shared/components/Slider/RowSlider/RowSlider'
import { convertArray } from '../../../utils'
import { ProductCard } from '../../ProductCard/ProductCard'
import s from './new-products.module.scss'

export const NewProducts = () => {
	const [newProducts, setNewProducts] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const params = {
			filter: {
				tags: 'new',
			},
			sort: 'createdAt',
			limit: 12,
		}

		const fetchData = async () => {
			setIsLoading(true)

			try {
				const { products } = await productsAPI.getAll(params)
				setNewProducts(products)
			} catch (e) {
				console.log(e)
			}

			setIsLoading(false)
		}

		fetchData()
	}, [])

	const items = convertArray(newProducts, 2).map((col, index) => {
		return (
			<div className={s.product_tower} key={index}>
				{col.map((product) => {
					return <ProductCard size='lg' imgSize='sm' key={product.slug} product={product} className={s.product} />
				})}
			</div>
		)
	})

	const responsive = {
		0: {
			items: 3,
		},
	}

	return <RowSlider title='New products' items={items} responsive={responsive} />
}
