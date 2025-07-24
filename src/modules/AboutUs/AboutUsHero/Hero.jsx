import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'

import office from '@assets/images/about-us/office.jpg'
import signature from '@assets/images/about-us/signature.jpg'

import s from './hero.module.scss'

export const Hero = () => {
	return (
		<section>
			<div className='container'>
				<ImageWithFallback className={s.img} src={office} onlySrc />
				<div className={s.content}>
					<h3 className={s.title}>We Are A Digital Food Store Delivering Freshness & Trust To Your Table</h3>
					<p className={s.text}>
						Founded in 2021, Safira has grown from a small local delivery service to one of the region`s most trusted
						online food retailers. We partner directly with local farmers, premium suppliers, and artisanal producers to
						ensure every product meets our strict quality standards. Our mission is simple: make fresh, healthy, and
						delicious food accessible to everyone, delivered with care and convenience that fits your lifestyle.
					</p>
					<ImageWithFallback src={signature} onlySrc />
				</div>
			</div>
		</section>
	)
}
