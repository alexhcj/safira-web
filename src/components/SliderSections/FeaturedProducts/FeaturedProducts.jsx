import { useEffect, useState } from 'react'

import cn from 'classnames'

import { productsAPI } from '@api/products'

import { SectionSlider } from '@shared/components/Slider/SectionSlider/SectionSlider'

import { to2DArray } from '@utils/array'

import { ProductCard } from '../../ProductCard/ProductCard'

import os from './styles/alice-carousel-isolated.module.scss'
import s from './styles/featured-products.module.scss'

export const FeaturedProducts = () => {
	const [featuredProducts, setFeaturedProducts] = useState([])

	useEffect(() => {
		const params = {
			sort: 'createdAt',
			limit: 15,
		}

		const fetchData = async () => {
			try {
				const { products } = await productsAPI.getAll(params)
				setFeaturedProducts(products)
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [])

	const items = to2DArray(featuredProducts, 3).map((col, index) => {
		return (
			<div key={index} style={{ padding: '0 10px' }}>
				{col.map((product) => {
					return <ProductCard size='xs' imgSize='xs' key={product.slug} product={product} className={s.product} />
				})}
			</div>
		)
	})

	const responsive = {
		0: {
			items: 3,
		},
	}

	return (
		<>
			<div className={cn('container', os.featuredProductsSliderWrapper)}>
				<SectionSlider
					title='Featured products'
					subtitle='Recently added our store'
					items={items}
					responsive={responsive}
				/>
			</div>
		</>
	)
}
