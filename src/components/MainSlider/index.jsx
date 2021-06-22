import { useEffect, useState } from 'react'
import { sliderAPI } from '../../api'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import s from './mainslider.module.css'

export const MainSlider = () => {
	const [slides, setSlides] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await sliderAPI.getSlides()
				setSlides(data)
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [])

	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 1,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 1,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 1,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	}

	return (
		<Carousel responsive={responsive} infinite={true} swipeable={true} draggable={true}>
			{slides.map((slide) => {
				const { id, title, subTitle, text, img } = slide

				return (
					<div className={s.item} key={id}>
						<img className={s.img} src={img} alt={title} />
						<div className={s.inner}>
							<h1>{title}</h1>
							<h5>{subTitle}</h5>
							<p>{text}</p>
						</div>
					</div>
				)
			})}
		</Carousel>
	)
}

// TODO: title and subtitle each word CAP
// TODO: i react slider
