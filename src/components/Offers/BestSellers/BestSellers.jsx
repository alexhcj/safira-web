import { useEffect, useState } from 'react'
import {productsAPI} from "../../../api/products";
import { ProductCard } from '../../ProductCard/ProductCard'
import { Arrow } from '../../MainSlider/Controls/Arrow/Arrow'
import { convertArray } from '../../../utils/index'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import s from './bestsellers.module.css'

export const BestSellers = () => {
	const [bestsellers, setBestsellers] = useState([])

	useEffect(() => {
		const params = {
			sort: 'popularity',
			limit: 8,
		}

		const fetchData = async () => {
			try {
				const data = await productsAPI.getAll(params)
				setBestsellers(convertArray(data, 2))
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
			slidesToSlide: 1,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 2,
			slidesToSlide: 1,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			slidesToSlide: 1,
		},
	}

	return (
		<div className={s.block}>
			<h3 className={s.heading}>Best Sellers</h3>
			<Carousel
				responsive={responsive}
				infinite={true}
				swipeable={false}
				draggable={false}
				customTransition='transform 250ms ease'
				containerClass={s.slider__container}
				customLeftArrow={<Arrow />}
				customRightArrow={<Arrow />}
			>
				{bestsellers.map((col, index) => {
					return (
						<div key={index}>
							{col.map((product) => {
								return <ProductCard imgSize='xs' key={product.id} product={product} />
							})}
						</div>
					)
				})}
			</Carousel>
		</div>
	)
}

// TODO: BAD ANIMATION. if change slides too fast they transform too slow. also stopped and blocked when slides ends.
