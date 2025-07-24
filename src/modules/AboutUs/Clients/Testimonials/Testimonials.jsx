import cn from 'classnames'
import AliceCarousel from 'react-alice-carousel'

import Avatar1 from '@assets/images/about-us/avatar-1.png'
import Avatar2 from '@assets/images/about-us/avatar-2.png'
import Avatar3 from '@assets/images/about-us/avatar-3.png'
import Quotes from '@assets/images/about-us/quotes.png'

import './alice-carousel-override-testimonials-slider.css'
import s from './testimonials.module.scss'

const testimonials = [
	{
		img: Avatar1,
		name: 'Maria Rodriguez',
		text: '"Safira has completely changed how I shop for groceries. The quality of their organic produce is outstanding, and the delivery is always on time. My family loves the freshness, and I love the convenience!"',
	},
	{
		img: Avatar2,
		name: 'James Chen',
		text: '"As a busy professional, Safira saves me hours every week. Their meal planning packages are perfect for my dietary needs, and the customer service team is incredibly helpful whenever I have questions."',
	},
	{
		img: Avatar3,
		name: 'Emily Thompson',
		text: '"I\'ve been using Safira for over two years now. Their commitment to supporting local farmers and sustainable practices aligns perfectly with my values. Plus, everything always arrives fresh and beautifully packaged!"',
	},
]

export const Testimonials = () => {
	const items = testimonials.map((item, index) => (
		<div className={s.item} key={index}>
			<img className={s.quotes} src={Quotes} alt='Quotes' />
			<img className={s.img} src={item.img} alt={`Review by ${item.name}`} />
			<p className={s.text}>{item.text}</p>
			<span className={s.name}>{item.name}</span>
		</div>
	))

	const dot = () => <span className={cn(s.dot)}></span>

	const responsive = {
		0: {
			items: 1,
		},
	}

	return (
		<div className={s.box}>
			<h3 className={s.title}>What Our Customers Says ?</h3>
			<AliceCarousel
				responsive={responsive}
				items={items}
				mouseTracking={true}
				infinite={true}
				autoPlay={true}
				autoPlayInterval={5000}
				disableButtonsControls={true}
				animationType='fadeout'
				animationDuration={250}
				renderDotsItem={dot}
			/>
		</div>
	)
}
