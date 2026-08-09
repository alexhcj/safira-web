import { useEffect, useState } from 'react'

import { productsAPI } from '@api/products'

import { SectionSlider } from '@shared/components/Slider/SectionSlider/SectionSlider'
import { ProductRowCardSkeleton } from '@shared/components/UI/Skeletons/BestSellersSkeleton/ProductRowCardSkeleton'

import { to2DArray } from '@utils/array'

import { ProductCard } from '../../ProductCard/ProductCard'

import s from './styles/featured-products.module.scss'

export const FeaturedProducts = () => {
	const [featuredProducts, setFeaturedProducts] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const params = {
			sort: 'createdAt',
			limit: 15,
		}

		const fetchData = async () => {
			setIsLoading(true)

			try {
				const { products } = await productsAPI.getAll(params)
				setFeaturedProducts(products)
			} catch (e) {
				console.log(e)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	const skeletonMock = to2DArray(Array.from({ length: 9 }), 3).map((col, idx) => (
		<div className={s.box} key={idx}>
			{col.map((_, index) => (
				<ProductRowCardSkeleton key={`${idx}-${index}`} />
			))}
		</div>
	))

	const items = isLoading
		? skeletonMock
		: to2DArray(featuredProducts, 3).map((col, index) => {
			return (
				<div className={s.box} key={index}>
					{col.map((product) => {
						return <ProductCard className={s.product} size='xs' imgSize='xs' key={product.slug} product={product} />
					})}
				</div>
			)
		})

	const responsive = {
		0: {
			items: 1,
		},
		768: {
			items: 2,
		},
		991: {
			items: 3,
		},
	}

	return (
		<section className={s.section}>
			<div className='container'>
				<SectionSlider
					title='Featured products'
					subtitle='Recently added our store'
					items={items}
					responsive={responsive}
				/>
			</div>
		</section>
	)
}
