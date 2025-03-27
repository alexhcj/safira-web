import React, { useEffect, useState } from 'react'
import { productsAPI } from '../../api/products'
import { SectionSlider } from '../../shared/components/Slider/SectionSlider/SectionSlider'
import { ProductCard } from '../ProductCard/ProductCard'
import s from './related-products.module.scss'

export const RelatedProducts = ({ slug }) => {
	const [products, setProducts] = useState([])

	useEffect(() => {
		const query = {
			limit: 10,
			slug,
		}

		const fetchData = async () => {
			try {
				const data = await productsAPI.getRelated(query)

				setProducts(data)
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [slug])

	const items = products.map((product) => {
		return <ProductCard key={product.slug} product={product} className={s.product} size='sm' imgSize='sm' />
	})

	const responsive = {
		0: {
			items: 5,
		},
	}

	return (
		<section className={s.section}>
			<SectionSlider title='Related products' items={items} responsive={responsive} />
		</section>
	)
}
