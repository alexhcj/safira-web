import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'

import advantages from '@assets/images/about-us/advantages.jpg'
import DeliveryTruckSVG from '@assets/svg/delivery-truck.svg'
import FarmSVG from '@assets/svg/farm.svg'
import RefreshSVG from '@assets/svg/refresh.svg'

import s from './advantages.module.scss'

const list = [
	{
		icon: FarmSVG,
		title: 'Curated Selection',
		text: 'Hand-picked products from trusted suppliers, featuring organic, local, and artisanal foods that meet our quality standards.',
	},
	{
		icon: RefreshSVG,
		title: '100% Freshness Guarantee',
		text: 'If you`re not completely satisfied with the freshness of any product, we`ll replace it or refund your money, no questions asked.',
	},
	{
		icon: DeliveryTruckSVG,
		title: 'Fast Delivery Service',
		text: 'Same-day and next-day delivery options available, with temperature-controlled vehicles to maintain product quality during transport.',
	},
]

export const Advantages = () => {
	return (
		<section className={s.section}>
			<ImageWithFallback className={s.img} src={advantages} onlySrc />
			<div className='container'>
				<ul className={s.list}>
					{list.map((item, index) => (
						<li className={s.item} key={index}>
							<div className={s.icon_box}>
								<img className={s.icon} src={item.icon} alt={item.title} />
							</div>
							<h5 className={s.title}>{item.title}</h5>
							<p className={s.text}>{item.text}</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
