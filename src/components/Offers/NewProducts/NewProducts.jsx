import { useEffect, useState } from 'react'

import cn from 'classnames'

import { productsAPI } from '@api/products'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { RowSlider } from '@shared/components/Slider/RowSlider/RowSlider'
import { ProductCardSkeleton } from '@shared/components/UI/Skeletons/ProductCardSkeleton/ProductCardSkeleton'

import { to2DArray } from '@utils/array'

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
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	const skeletonMock = to2DArray(Array.from({ length: 6 }), 2).map((col, idx) => (
		<div className={s.box} key={idx}>
			{col.map((_, index) => (
				<ProductCardSkeleton key={`${idx}-${index}`} />
			))}
		</div>
	))

	const items = isLoading
		? skeletonMock
		: to2DArray(newProducts, 2).map((col, index) => {
			const nameLength = col[0].name.length

			return (
				<div
					className={cn(s.box, { [s.big]: nameLength < 28, [s.mid]: nameLength >= 28 && nameLength <= 43 })}
					key={index}
				>
					{col.map((product) => {
						return <ProductCard size='sm' imgSize='sm' key={product.slug} product={product} />
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
		991: {
			items: 3,
		},
	}

	if (isLoading) {
		return <Preloader />
	}

	return (
		<RowSlider title='New products' type='new-products' items={items} responsive={responsive} className={s.slider} />
	)
}
