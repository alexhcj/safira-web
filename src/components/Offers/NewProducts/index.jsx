import s from './newproducts.module.css'
import { useEffect, useState } from 'react'
import { productsAPI } from '../../../api'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

export const NewProducts = () => {
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
			items: 3,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 3,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 3,
		},
	}

	return (
		<div className={s.block}>
			<h3 className={s.heading}>New Products</h3>
			<Carousel responsive={responsive} infinite={true} swipeable={false} draggable={false}>
				{bestsellers.map((slide) => {
					const { id, name, img, category, price, newprice, newProduct, sale } = slide
					let saleTxt = ''

					if (sale === true) {
						saleTxt = 'SALE'
					}
					if (newProduct === true) {
						return (
							<div className={s.item} key={id}>
								<div className={s.product}>
									<p className={s.sale}>{saleTxt}</p>
									<p className={s.new}>NEW</p>
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
									<p className={s.sale}>{saleTxt}</p>
									<p className={s.new}>NEW</p>
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
					}
				})}
			</Carousel>
		</div>
	)
}
