import s from './featuredProducts.module.css'
import { useEffect, useState } from 'react'
import { productsAPI } from '../../api'
import { convertArray } from '../../utils'
import { Product } from '../Product'
import { ButtonGroup } from '../MainSlider/Controls/BtnGroup'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

export const FeaturedProducts = () => {
	const [featuredProducts, setFeaturedProducts] = useState([])
	const [btnShow, setBtnShow] = useState(false)

	useEffect(() => {
		const params = {
			sort: 'added',
			limit: 15,
		}

		const fetchData = async () => {
			try {
				const data = await productsAPI.getProducts(params)
				setFeaturedProducts(convertArray(data.data, 3))
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

	const handleBtnGroupToggle = (e) => {
		e.type === 'mouseenter' ? setBtnShow(true) : setBtnShow(false)
	}

	return (
		<div className={s.section}>
			<div className='container'>
				<div className={s.header}>
					<h5 className={s.desc}>Recently added our store</h5>
					<h3 className={s.title}>Featured Products</h3>
				</div>
				<div className={s.slider} onMouseEnter={handleBtnGroupToggle} onMouseLeave={handleBtnGroupToggle}>
					<Carousel
						responsive={responsive}
						infinite={true}
						swipeable={false}
						draggable={false}
						customTransition='transform 250ms ease'
						containerClass={s.slider__container}
						itemClass={s.slide}
						arrows={false}
						renderButtonGroupOutside={true}
						onMouseEnter={handleBtnGroupToggle}
						onMouseLeave={handleBtnGroupToggle}
						customButtonGroup={<ButtonGroup active={btnShow} />}
					>
						{featuredProducts.map((col, index) => {
							return (
								<div key={index}>
									{col.map((product) => {
										return <Product key={product.id} product={product} />
									})}
								</div>
							)
						})}
					</Carousel>
				</div>
			</div>
		</div>
	)
}

// TODO: fix Playfair Display font. not like template's font!!!
