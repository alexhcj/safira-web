import { useEffect, useState } from 'react'

import { productsAPI } from '@api/products'

import { SectionSlider } from '@shared/components/Slider/SectionSlider/SectionSlider'

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

	const items = products.map((product, idx) => {
		return (
			<div className={s.box} key={idx}>
				<ProductCard product={product} size='sm' imgSize='sm' />
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
			items: 3,
		},
		991: {
			items: 4,
		},
		1200: {
			items: 5,
		},
	}

	return (
		<section className={s.section}>
			<SectionSlider title='Related products' items={items} responsive={responsive} />
		</section>
	)
}
