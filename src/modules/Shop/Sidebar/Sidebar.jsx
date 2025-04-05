import { Search } from './Search/Search'
import { FilterTitle } from '../../../shared/components/UI/Sidebar/FilterTitle/FilterTitle'
import { PriceRange } from './PriceRange/PriceRange'
import { BannerOffer } from './BannerOffer/BannerOffer'
import { BrandFilter } from './BrandFilter/BrandFilter'
import s from './sidebar.module.scss'
import { DietaryFilter } from './DietaryFilter/DietaryFilter'

export const Sidebar = ({ meta }) => {
	return (
		<aside className={s.aside}>
			<div>
				<FilterTitle text='Filter by name' />
				<Search />
			</div>
			<div>
				<FilterTitle text='Filter by price' />
				<PriceRange meta={meta} />
			</div>
			<div>
				<FilterTitle text='Select by brand' />
				<BrandFilter />
			</div>
			<div>
				<FilterTitle text='Dietary tags' />
				<DietaryFilter />
			</div>
			<BannerOffer imgSize='shop' />
		</aside>
	)
}
