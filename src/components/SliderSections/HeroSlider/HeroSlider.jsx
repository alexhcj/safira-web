import cn from 'classnames'
import AliceCarousel from 'react-alice-carousel'
import { NavLink } from 'react-router-dom'

import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { Text } from '@shared/components/UI/Text/Text'

import Slide1 from '@assets/images/slider/1.jpg'
import Slide2 from '@assets/images/slider/2.jpg'
import Slide3 from '@assets/images/slider/3.jpg'

import './styles/alice-carousel-override-main-slider.css'
import s from './styles/main-slider.module.scss'
import 'react-alice-carousel/lib/scss/alice-carousel.scss'

const data = [
	{
		id: 1,
		title: 'Fresh vegetables',
		subTitle: 'Natural farm products',
		text: 'Widest range of farm-fresh Vegetables, Fruits & seasonal produce',
		url: `${import.meta.env.VITE_WEB_PUBLIC_URL}/blog/fresh-vegetables`,
		img: Slide2,
	},
	{
		id: 2,
		title: 'Fresh tomatoes',
		subTitle: 'Natural farm products',
		text: 'Natural organic tomatoes make your health stronger. Put your information here',
		url: `${import.meta.env.VITE_WEB_PUBLIC_URL}/blog/fresh-tomatoes`,
		img: Slide3,
	},
	{
		id: 3,
		title: 'Vegetables big promo',
		subTitle: 'Fresh farm products',
		text: '10% certifled-organic mix of fruit and veggies. Perfect for weekly cooking and snacking!',
		url: `${import.meta.env.VITE_WEB_PUBLIC_URL}/blog/vegetables-big-promo`,
		img: Slide1,
	},
]

export const HeroSlider = () => {
	const responsive = {
		0: {
			items: 1,
		},
		1024: {
			items: 1,
		},
	}

	const handleDragStart = (e) => e.preventDefault()

	const slides = data.map(({ id, title, subTitle, text, img, url }) => (
		<div className={s.item} key={id} onDragStart={handleDragStart} role='presentation'>
			<img className={s.img} src={img} alt={title} />
			<div className={s.inner}>
				<div className='container'>
					<div className={s.content}>
						<h1 className={s.title}>{title}</h1>
						<h2 className={s.subTitle}>{subTitle}</h2>
						<p className={s.text}>{text}</p>
						<NavLink to={url}>
							<Button>
								<Text className={s.btn_text} color='white'>
									Read more
								</Text>
							</Button>
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	))

	const dot = () => <span className={cn(s.dot)}></span>

	return (
		<AliceCarousel
			responsive={responsive}
			items={slides}
			autoPlay={true}
			autoPlayInterval={5000}
			mouseTracking={true}
			infinite={true}
			disableButtonsControls={true}
			animationType='fadeout'
			animationDuration={800}
			renderDotsItem={dot}
		/>
	)
}
