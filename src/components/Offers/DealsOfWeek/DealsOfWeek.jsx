import { useEffect, useState } from 'react'

import { offersAPI } from '@api/offers'

import { useCartContext } from '@context/CartContext'

import { DealsOfWeekSlider } from '@shared/components/Slider/DealsOfWeekSlider/DealsOfWeekSlider'
import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { DealOfWeekSkeleton } from '@shared/components/UI/Skeletons/DealOfWeekSkeleton/DealOfWeekSkeleton'
import { Timer } from '@shared/components/UI/Timer/Timer'

import { ProductCard } from '../../ProductCard/ProductCard'

import s from './dealsweek.module.scss'

export const DealsOfWeek = () => {
	const { addToCart, isProductInCart } = useCartContext()
	const [deals, setDeals] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)

			try {
				const data = await offersAPI.getAll({ type: 'deals-of-week' })
				setDeals(data)
			} catch (e) {
				console.log(e)
			} finally {
				setIsLoading(false)
			}
		}
		fetchData()
	}, [])

	const skeletonMock = Array.from({ length: 1 }).map((_, idx) => <DealOfWeekSkeleton key={idx} />)

	const items = isLoading
		? skeletonMock
		: deals.map((product) => {
			return (
				<div className={s.deal} key={product.deal.slug}>
					<ProductCard className={s.product} product={product.deal} size='md-lg' imgSize='lg' />
					<Timer className={s.timer} type='days' date={product.expiresDate} />
					<Button className={s.btn} onClick={() => addToCart(product.deal)}>
						{isProductInCart(product.deal.slug) ? 'Add more' : 'Add to cart'}
					</Button>
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
	}

	return (
		<div className={s.box}>
			<h2 className={s.heading}>Deals Of The Week</h2>
			<div className={s.deals}>{<DealsOfWeekSlider items={items} responsive={responsive} />}</div>
		</div>
	)
}
