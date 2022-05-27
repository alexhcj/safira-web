import React  from 'react'
import cn from 'classnames'
import AliceCarousel from 'react-alice-carousel'
import { Button } from '../../shared/components/UI/Buttons/Button/Button'
import { Text } from '../../shared/components/UI/Text/Text'
import Slide1 from '../../assets/images/slider/1.jpg'
import Slide2 from '../../assets/images/slider/2.jpg'
import Slide3 from '../../assets/images/slider/3.jpg'
import 'react-alice-carousel/lib/scss/alice-carousel.scss'
import s from './styles/main-slider.module.scss'
import './styles/alice-carousel-override-main-slider.css'

const data = [
	{
		id: 1,
		title: 'Fresh vegetables',
		subTitle: 'Natural farm products',
		text: 'Widest range of farm-fresh Vegetables, Fruits & seasonal produce',
		img: Slide2
	},
	{
		id: 2,
		title: 'Fresh tomatoes',
		subTitle: 'Natural farm products',
		text: 'Natural organic tomatoes make your health stronger. Put your information here',
		img: Slide3
	},
	{
		id: 3,
		title: 'Vegetables big promo',
		subTitle: 'Fresh farm products',
		text: '10% certifled-organic mix of fruit and veggies. Perfect for weekly cooking and snacking!',
		img: Slide1
	},
]

export const HeroSlider = () => {
	const responsive = {
		0: {
			items: 1,
		},
		1024: {
			items: 1
		}
	}

	const handleDragStart = (e) => e.preventDefault()

	// TODO: add eslint rule return arrow func () brackets
	const slides = data.map(({ id, title, subTitle, text, img }) => (
		<div className={s.item} key={id} onDragStart={handleDragStart} role="presentation">
			<img className={s.img} src={img} alt={title} />
			<div className={s.inner}>
				<div className='container'>
					<div className={s.content}>
						<h1 className={s.title}>{title}</h1>
						<h2 className={s.subTitle}>{subTitle}</h2>
						<p className={s.text}>{text}</p>
						<Button to='/shop'>
							<Text className={s.btn_text} color="white">Read more</Text>
						</Button>
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
			animationType="fadeout"
			animationDuration={800}
			renderDotsItem={dot}
		/>
	)
}
