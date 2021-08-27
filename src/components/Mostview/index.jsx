import { useEffect, useState } from 'react'
import { productsAPI } from '../../api'
import { ButtonGroup } from '../MainSlider/Controls/BtnGroup'
import { Product } from '../Product'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import s from './mostview.module.css'

export const Mostview = () => {
	const [mostview, setMostview] = useState([])
	const [btnShow, setBtnShow] = useState(false)
	const limit = 10
	const sort = 'popularity'

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await productsAPI.getProducts(limit, sort)
				setMostview(data.data)
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

	const handleBtnGroupToggle = (e) => {
		e.type === 'mouseenter' ? setBtnShow(true) : setBtnShow(false)
	}

	return (
		<div className={s.section}>
			<div className='container'>
				<div className={s.block}>
					<h5 className={s.above_heading}>Recently added our store </h5>
					<h3 className={s.heading}>Mostview Products</h3>
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
							customButtonGroup={<ButtonGroup active={btnShow} />}
						>
							{mostview.map((product) => {
								return <Product size='large' key={product.id} product={product} />
							})}
						</Carousel>
					</div>
				</div>
			</div>
		</div>
	)
}

// TODO: create sliders layout 1.main (fullwidth | big) 2. best && new (column slider) with outdoor controls 3. mostview && ourblog (common)