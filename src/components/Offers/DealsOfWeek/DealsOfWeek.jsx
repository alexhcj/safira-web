import React, { useEffect, useState } from 'react'
import { offersAPI } from '../../../api/offers'
import { ProductCard } from '../../ProductCard/ProductCard'
import { DealsOfWeekSlider } from '../../../shared/components/Slider/DealsOfWeekSlider/DealsOfWeekSlider'
import s from './dealsweek.module.scss'

export const DealsOfWeek = () => {
	const [deals, setDeals] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await offersAPI.getOfferByType('deals-of-week')
				setDeals(data.deals)
			} catch (e) {
				console.log(e)
			}
		}
		fetchData()
	}, [])

	const items = deals.map((product) => {
		return (
			<>
				<ProductCard key={product.slug} product={product} size='lg' imgSize='lg' className={s.product} />
				{/*<Timer/>*/}
			</>
		)
	})

	const responsive = {
		0: {
			items: 1,
		},
	}

	return (
		<div>
			<h2 className={s.heading}>Deals Of The Week</h2>
			<div className={s.deals}>
				<DealsOfWeekSlider items={items} responsive={responsive} />
			</div>
		</div>
	)
}
