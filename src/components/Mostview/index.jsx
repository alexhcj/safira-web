import { useEffect, useState } from 'react'
import { productsAPI } from '../../api'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import s from './mostview.module.css'
import { Product } from '../Product'
import { Arrow } from '../MainSlider/Controls/Arrows'

export const Mostview = () => {
	const [mostview, setMostview] = useState([])
	const limit = 10

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await productsAPI.getProducts(limit)
				setMostview(data)
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [])

	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 5,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 5,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 5,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 5,
		},
	}

	return (
		<div className={s.section}>
			<div className='container'>
				<div className={s.block}>
					<h5 className={s.above_heading}>Recently added our store </h5>
					<h3 className={s.heading}>Mostview Products</h3>
					<Carousel
						responsive={responsive}
						infinite={true}
						swipeable={false}
						draggable={false}
                        customTransition='transform 250ms ease'
                        itemClass={s.item}
						containerClass={s.slider__container}
						customLeftArrow={<Arrow width={32} height={35} />}
						customRightArrow={<Arrow width={32} height={35} />}
					>
						{mostview.map((product) => {
							return <Product size='large' key={product.id} product={product} />
						})}
					</Carousel>
				</div>
			</div>
		</div>
	)
}

// TODO: right product margin
// TODO: product width