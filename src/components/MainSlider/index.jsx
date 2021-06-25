import { useEffect, useState } from 'react'
import { sliderAPI } from '../../api'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import s from './mainslider.module.css'
import { Button } from '../Button'
import { Dot } from './Dot'

export const MainSlider = () => {
	const [slides, setSlides] = useState([])
	// const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			// setIsLoading(true)

			try {
				const data = await sliderAPI.getSlides()
				setSlides(data)
			} catch (e) {
				console.log(e)
			}
			// setIsLoading(false)
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
		<Carousel
			responsive={responsive}
            // autoPlay={true}
            // autoPlaySpeed={5000}
            transitionDuration={300}
			swipeable={true}
			draggable={true}
			showDots={true}
            // infinite={true}
			arrows={false}
            dotListClass={s.list}
			customDot={<Dot />}
		>
			{slides.map((slide) => {
				const { id, title, subTitle, text, img } = slide

				return (
					<div className={s.item} key={id}>
						<img className={s.img} src={img} alt={title} />
						<div className={s.inner}>
							<div className='container'>
								<div className={s.content}>
									<h1 className={s.title}>{title}</h1>
									<h5 className={s.subTitle}>{subTitle}</h5>
									<p className={s.text}>{text}</p>
									<Button to='/shop' />
								</div>
							</div>
						</div>
					</div>
				)
			})}
		</Carousel>
	)
}

// BUG: fix appearence of 2nd slide when refresh page (infinite)
// : infinite param causes 2nd slide appear when page renders
// : if add isLoading state => will appear always last slide and no matter of quantity slides in db
// : if no isLoading state => will appear last - 1 slide

// TODO: check animation speed atc of slider
