import { useEffect, useState } from 'react'
import {productsAPI} from "../../../api/products";
import { Arrow } from '../../MainSlider/Controls/Arrow/Arrow'
import { ProductCard } from '../../ProductCard/ProductCard'
import { convertArray } from '../../../utils/index'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import s from './newproducts.module.css'
import PreloaderSVG from "../../../assets/svg/preloader.svg";

export const NewProducts = () => {
	const [newProducts, setNewProducts] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const params = {
			filter: {
				tags: 'new',
			},
			sort: 'createdAt',
			limit: 12,
		}

		const fetchData = async () => {
			setIsLoading(true)

			try {
				const {products} = await productsAPI.getAll(params)
				setNewProducts(convertArray(products, 2))
			} catch (e) {
				console.log(e)
			}

			setIsLoading(false)
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
			<Carousel
				responsive={responsive}
				infinite={true}
				swipeable={false}
				draggable={false}
				customTransition='transform 250ms ease'
				containerClass={s.slider__container}
				itemClass={s.slide}
				customLeftArrow={<Arrow />}
				customRightArrow={<Arrow />}
			>
				{isLoading ? (
					<img src={PreloaderSVG} alt="Preloader"/>
				) : (
					newProducts.map((col, index) => {
						return (
							<div key={index}>
								{col.map((product) => {
									return <ProductCard size='large' imgSize='sm' key={product.slug} product={product} />
								})}
							</div>
						)
					})
				)}
			</Carousel>
		</div>
	)
}

// DONE: fix right block padding and product right margin. NOW: margin X axis -10px, itemClass padding X axis 10px
// TODO: slider container has no strict boundaries. when slide => 10px of padding seen
// TODO: replace fckg apple 212 on 600
