import { BannerOffer } from '@modules/Shop/Sidebar/BannerOffer/BannerOffer'

import { BestSellers } from './BestSellers/BestSellers'
import { DealsOfWeek } from './DealsOfWeek/DealsOfWeek'
import { NewProducts } from './NewProducts/NewProducts'

import s from './offers.module.scss'

export const Offers = () => {
	return (
		<div className={s.section}>
			<div className='container'>
				<div className={s.wrapper}>
					<div className={s.left}>
						<DealsOfWeek />
						<BannerOffer imgSize='special' />
					</div>
					<div className={s.right}>
						<BestSellers />
						<NewProducts />
					</div>
				</div>
			</div>
		</div>
	)
}
