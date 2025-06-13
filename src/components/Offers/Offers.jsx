import { BannerOffer } from '@modules/Shop/Sidebar/BannerOffer/BannerOffer'

import { Space } from '@shared/components/UI/Spacing/Space'

import { BestSellers } from './BestSellers/BestSellers'
import { DealsOfWeek } from './DealsOfWeek/DealsOfWeek'
import { NewProducts } from './NewProducts/NewProducts'

import s from './offers.module.scss'

export const Offers = () => {
	return (
		<div className={s.section}>
			<Space space={70} />
			<div className='container'>
				<div className={s.wrapper}>
					<div className={s.left}>
						<DealsOfWeek />
						<BannerOffer imgSize='special' />
					</div>
					<div className={s.right}>
						<BestSellers />
						<Space space={30} />
						<NewProducts />
					</div>
				</div>
			</div>
			<Space space={70} />
		</div>
	)
}
