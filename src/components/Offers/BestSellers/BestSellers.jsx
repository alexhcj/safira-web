import { useEffect, useState } from 'react'

import { productsAPI } from '@api/products'

import { RowSlider } from '@shared/components/Slider/RowSlider/RowSlider'

import { to2DArray } from '@utils/array'

import { ProductCard } from '../../ProductCard/ProductCard'

import s from './bestsellers.module.scss'

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

	const items = to2DArray(bestsellers, 2).map((col, index) => {
		return (
			<div className={s.box} key={index}>
				{col.map((product) => {
					return <ProductCard size='xs' imgSize='xs' key={product.slug} product={product} />
				})}
			</div>
		)
	})

	const responsive = {
		0: {
			items: 1,
		},
		576: {
			items: 2,
		},
		768: {
			items: 1,
		},
		991: {
			items: 2,
		},
	}

	return <RowSlider title='Best sellers' items={items} responsive={responsive} />
}
