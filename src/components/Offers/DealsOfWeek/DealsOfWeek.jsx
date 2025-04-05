import { useEffect, useState } from 'react';
import { offersAPI } from '../../../api/offers'
import { useCartContext } from '../../../context/CartContext'
import { DealsOfWeekSlider } from '../../../shared/components/Slider/DealsOfWeekSlider/DealsOfWeekSlider'
import { Timer } from '../../../shared/components/UI/Timer/Timer'
import { ProductCard } from '../../ProductCard/ProductCard'
import { Button } from '../../../shared/components/UI/Buttons/Button/Button'
import s from './dealsweek.module.scss'

export const DealsOfWeek = () => {
	const [deals, setDeals] = useState([])
	const { addToCart } = useCartContext()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await offersAPI.getAll({ type: 'deals-of-week' })
				setDeals(data)
			} catch (e) {
				console.log(e)
			}
		}
		fetchData()
	}, [])

	const items =
		deals &&
		deals.map((product) => {
			return (
				<div className={s.deal} key={product.deal.slug}>
					<ProductCard product={product.deal} size='md-lg' imgSize='md-lg' />
					<Timer className={s.timer} date={product.expiresDate} />
					<Button className={s.btn} onClick={() => addToCart(product.deal)}>
						Add to cart
					</Button>
				</div>
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
			<div className={s.deals}>{<DealsOfWeekSlider items={items} responsive={responsive} />}</div>
		</div>
	)
}
