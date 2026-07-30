import { useEffect, useState } from 'react'

import { productsAPI } from '@api/products'

import { SectionSlider } from '@shared/components/Slider/SectionSlider/SectionSlider'
import { ProductCardSkeleton } from '@shared/components/UI/Skeletons/ProductCardSkeleton/ProductCardSkeleton'

import { ProductCard } from '../../ProductCard/ProductCard'

import s from './mostview-products.module.scss'

export const MostviewProducts = () => {
	const [mostviewProducts, setMostviewProducts] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const params = {
			sort: 'views',
			limit: 10,
		}

		const fetchData = async () => {
			setIsLoading(true)

			try {
				const { products } = await productsAPI.getAll(params)
				setMostviewProducts(products)
			} catch (e) {
				console.log(e)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	const skeletonMock = Array.from({ length: 5 }).map((_, idx) => (
		<div className={s.box} key={idx}>
			<ProductCardSkeleton />
		</div>
	))

	const items = isLoading
		? skeletonMock
		: mostviewProducts.map((product, idx) => {
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
			<div className='container'>
				<SectionSlider
					title='Mostview products'
					subtitle='Most viewed our store'
					items={items}
					responsive={responsive}
				/>
			</div>
		</section>
	)
}
