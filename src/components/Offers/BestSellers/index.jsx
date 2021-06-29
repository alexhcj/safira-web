import s from './bestsellers.module.css'
import { useEffect, useState } from 'react'
import { productsAPI } from '../../../api'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

export const BestSellers = () => {
	const [bestsellers, setBestsellers] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await productsAPI.getBestsellers()
				setBestsellers(data)
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [])

	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 2,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 2,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 2,
		},
	}

	return (
		<div className={s.block}>
			<h3 className={s.heading}>Best Sellers</h3>
			<Carousel responsive={responsive} infinite={true} swipeable={false} draggable={false}>
				{bestsellers.map((slide) => {
					const { id, name, img, category, price, newprice } = slide

					return (
						<div className={s.item} key={id}>
							<div className={s.product}>
								<img className={s.img} src={img} alt={name} />
								<div className={s.product__info}>
									<h3 className={s.name}>{name}</h3>
									<h4 className={s.category}>{category}</h4>
									<p className={s.price}>
										{newprice}
										<span className={s.oldprice}>{price}</span>
									</p>
								</div>
							</div>
							<div className={s.product}>
								<img className={s.img} src={img} alt={name} />
								<div className={s.product__info}>
									<h3 className={s.name}>{name}</h3>
									<h4 className={s.category}>{category}</h4>
									<p className={s.price}>
										{newprice}
										<span className={s.oldprice}>{price}</span>
									</p>
								</div>
							</div>
						</div>
					)
				})}
			</Carousel>
		</div>
	)
}
