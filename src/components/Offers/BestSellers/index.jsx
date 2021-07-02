import s from './bestsellers.module.css'
import { useEffect, useState } from 'react'
import { productsAPI } from '../../../api'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

export const BestSellers = () => {
	const [bestsellers, setBestsellers] = useState([''])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await productsAPI.getBestsellers()
				setBestsellers(doubleSlider(data))
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
			slidesToSlide: 4,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 2,
			slidesToSlide: 4,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 4,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 4,
		},
	}

	let cols = []

	const doubleSlider = (arr = bestsellers) => {
		let col = []
		let arrCols = []
		let counter = 0
		console.log(`COL ${col}`)

		arr.forEach((slide, index) => {
			// console.log(index)

			if (counter < 2) {
				col.push(slide)
				counter++
			} else {
				arrCols.push(col)
				counter = 0
				col = []
			}

			// const { id, name, img, category, price, newprice } = slide

			// let template = `
			//         <div key=${id} className=${s.product}>
			//             <img className=${s.img} src=${img} alt=${name} />
			//             <div className=${s.product__info}>
			//                 <h3 className=${s.name}>${name}</h3>
			//                 <h4 className=${s.category}>${category}</h4>
			//                 <p className=${s.price}>
			//                     ${newprice}
			//                     <span className=${s.oldprice}>${price}</span>
			//                 </p>
			//             </div>
			//         </div>
			//     `
			// console.log(template)

			// if (index < 2) {
			// 	console.log(`INDEX ${index}`)
			// 	row += template
			// 	console.log(`ROW ${row}`)
			// 	let key = JSON.parse(
			// 		JSON.stringify({
			// 			key: `${template}`,
			// 		})
			// 	)
			// 	console.log(`KEY ${key}`)
			// 	cols.push(row)
			// } else {
			// 	row = ''
			// }

			console.log(arrCols)
			return null
		})

		return arrCols
	}

	// console.log(cols)

	return (
		<div className={s.block}>
			<h3 className={s.heading}>Best Sellers</h3>
			<Carousel responsive={responsive} infinite={true} swipeable={false} draggable={false}>
				{bestsellers.forEach((col) => {
					return col.map((slide) => {
						const { id, name, img, category, price, newprice } = slide

						return (
							<div key={id} className={s.product}>
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
						)
					})
				})}
			</Carousel>
		</div>
	)
	// return (
	// 	<div className={s.block}>
	// 		<h3 className={s.heading}>Best Sellers</h3>
	// 		<Carousel responsive={responsive} infinite={true} swipeable={false} draggable={false}>
	// 			{bestsellers.map((slide) => {
	// 				const { id, name, img, category, price, newprice } = slide

	// 				return (
	// 					<div key={id} className={s.product}>
	// 						<img className={s.img} src={img} alt={name} />
	// 						<div className={s.product__info}>
	// 							<h3 className={s.name}>{name}</h3>
	// 							<h4 className={s.category}>{category}</h4>
	// 							<p className={s.price}>
	// 								{newprice}
	// 								<span className={s.oldprice}>{price}</span>
	// 							</p>
	// 						</div>
	// 					</div>
	// 				)
	// 			})}
	// 		</Carousel>
	// 	</div>
	// )
}
