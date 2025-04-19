import { useEffect, useState } from 'react'

import { productsAPI } from '@api/products'

import { SectionSlider } from '@shared/components/Slider/SectionSlider/SectionSlider'

import { ProductCard } from '../../ProductCard/ProductCard'

import s from './mostview-products.module.scss'

export const MostviewProducts = () => {
	const [mostviewProducts, setMostviewProducts] = useState([])

	useEffect(() => {
		const params = {
			sort: 'views',
			limit: 10,
		}

		const fetchData = async () => {
			try {
				const { products } = await productsAPI.getAll(params)
				setMostviewProducts(products)
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [])

	const items = mostviewProducts.map((product) => {
		return <ProductCard key={product.slug} product={product} className={s.product} size='sm' imgSize='sm' />
	})

	const responsive = {
		0: {
			items: 5,
		},
	}

	return (
		<>
			<div className='container'>
				<SectionSlider
					title='Mostview products'
					subtitle='Most viewed our store'
					items={items}
					responsive={responsive}
				/>
			</div>
		</>
	)
}
