import s from './bestsellers.module.css'
import { useEffect, useState } from 'react'
import { productsAPI } from '../../../api'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import style from '../../Hovermenu/hoverproducts.module.css'
import { Hovermenu } from '../../Hovermenu'

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
	let y = -2
	let z = -1
	return (
		<div className={s.block}>
			<h3 className={s.heading}>Best Sellers</h3>
			<Carousel responsive={responsive} infinite={true} swipeable={false} draggable={false}>
				{bestsellers.map((slide) => {
					const { id, name, img, category, price, newprice } = slide
					
					
			while(y<8){ 	
				return y++,y++,z++,z++, (
						<div className={s.item}>
							<div className={style.parent}>
								<div className={s.product} key={bestsellers[y].id}>
									<div className={style.wrapeer_bestsellers_mg}>
									<Hovermenu />
									</div>
									<img className={s.img} src={bestsellers[y].img} alt={name} />
									<div className={s.product__info}>
										<h3 className={s.name}>{bestsellers[y].name}</h3>
										<h4 className={s.category}>{bestsellers[y].category}</h4>
										<p className={s.price}>
											{bestsellers[y].newprice}
											<span className={s.oldprice}>{bestsellers[y].price}</span>
										</p>
									</div>
								</div>
							</div>
							<div className={style.parent}>
								<div className={s.product} key={bestsellers[y].id}>
								<div className={style.wrapeer_bestsellers_mg}>
									<Hovermenu />
									</div>
									<img className={s.img} src={bestsellers[z].img} alt={name} />
									<div className={s.product__info}>
										<h3 className={s.name}>{bestsellers[z].name}</h3>
										<h4 className={s.category}>{bestsellers[z].category}</h4>
										<p className={s.price}>
											{bestsellers[z].newprice}
											<span className={s.oldprice}>{bestsellers[z].price}</span>
										</p>
									</div>
								</div>
							</div>
						</div>
						
					)}
				})}
			</Carousel>
		</div>
	)
}
