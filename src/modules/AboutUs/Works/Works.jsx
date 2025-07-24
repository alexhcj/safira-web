import Works1 from '@assets/images/about-us/works-1.jpg'
import Works2 from '@assets/images/about-us/works-2.jpg'
import Works3 from '@assets/images/about-us/works-3.jpg'

import s from './works.module.scss'

const list = [
	{
		img: Works1,
		title: 'What do we do?',
		text: 'We source the finest fresh produce, organic groceries, dairy products, and specialty foods from local farms and trusted suppliers. Our team of food experts carefully selects each item to ensure you receive only the best quality products for you and your family.',
		alt: 'Fresh organic vegetables and fruits',
	},
	{
		img: Works2,
		title: 'Our Mission',
		text: 'To revolutionize grocery shopping by providing convenient access to fresh, healthy, and sustainable food options. We believe everyone deserves quality nutrition, and we`re committed to supporting local communities and environmental sustainability in everything we do.',
		alt: 'Sustainable farming and environmental mission',
	},
	{
		img: Works3,
		title: 'History Of Us',
		text: 'Started by Sarah Mitchell in 2020 with just a small van and a passion for fresh food, Safira has grown to serve over 50,000 customers across the region. Our journey from a local startup to a trusted brand reflects our unwavering commitment to quality and customer satisfaction.',
		alt: 'Dedicated customer service team',
	},
]

export const Works = () => {
	return (
		<section>
			<div className='container'>
				<div className={s.box}>
					<ul className={s.list}>
						{list.map((item, index) => (
							<li className={s.item} key={index}>
								<img className={s.img} src={item.img} alt={item.title} />
								<h5 className={s.title}>{item.title}</h5>
								<p className={s.text}>{item.text}</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	)
}
