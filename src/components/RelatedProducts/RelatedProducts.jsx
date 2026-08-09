import { useEffect, useState } from 'react'

import { productsAPI } from '@api/products'

import { SectionSlider } from '@shared/components/Slider/SectionSlider/SectionSlider'
import { ProductCardSkeleton } from '@shared/components/UI/Skeletons/ProductCardSkeleton/ProductCardSkeleton'

import { ProductCard } from '../ProductCard/ProductCard'

import s from './related-products.module.scss'

export const RelatedProducts = ({ slug }) => {
	const [products, setProducts] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const query = {
			limit: 10,
			slug,
		}

		const fetchData = async () => {
			setIsLoading(true)
			try {
				const data = await productsAPI.getRelated(query)

				setProducts(data)
			} catch (e) {
				console.log(e)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [slug])

	const skeletonMock = Array.from({ length: 5 }).map((_, idx) => (
		<div className={s.box} key={idx}>
			<ProductCardSkeleton />
		</div>
	))

	const items = isLoading
		? skeletonMock
		: products.map((product, idx) => {
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
