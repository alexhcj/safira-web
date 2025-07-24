import { Faq } from '@modules/AboutUs/Clients/Faq/Faq'
import { Testimonials } from '@modules/AboutUs/Clients/Testimonials/Testimonials'

import s from './clients.module.scss'

export const Clients = () => {
	return (
		<section>
			<div className='container'>
				<div className={s.box}>
					<Faq />
					<Testimonials />
				</div>
			</div>
		</section>
	)
}
