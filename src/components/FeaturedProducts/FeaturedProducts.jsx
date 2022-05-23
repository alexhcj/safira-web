import { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import {productsAPI} from "../../api/products";
import { ProductCard } from '../ProductCard/ProductCard'
import { ButtonGroup } from '../MainSlider/Controls/BtnGroup/ButtonGroup'
import {SectionHeader} from "../../shared/components/UI/Section/SectionHeader/SectionHeader";
import {Space} from "../../shared/components/UI/Spacing/Space";
import { convertArray } from '../../utils'
import 'react-multi-carousel/lib/styles.css'
import s from './featured-products.module.scss'

export const FeaturedProducts = () => {
	const [featuredProducts, setFeaturedProducts] = useState([])
	const [btnShow, setBtnShow] = useState(false)

	useEffect(() => {
		const params = {
			sort: 'createdAt',
			limit: 15,
		}

		const fetchData = async () => {
			try {
				const {products} = await productsAPI.getAll(params)
				setFeaturedProducts(convertArray(products, 3))
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
		<>
			<Space space={65} />
			<div className='container'>
				<SectionHeader title="Featured Products" subtitle="Recently added our store" />
				<Space space={30} />
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
										return <ProductCard size="xs" imgSize='xs' key={product.id} product={product} />
									})}
								</div>
							)
						})}
					</Carousel>
				</div>
			</div>
			<Space space={70} />
		</>
	)
}

// TODO: fix Playfair Display font. not like template's font!!!
