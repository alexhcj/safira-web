import { useCartContext } from '@context/CartContext'
import { useCompareContext } from '@context/CompareContext'
import { useWishlistContext } from '@context/WishlistContext'

import { CompareSlider } from '@shared/components/Slider/CompareSlider/CompareSlider'
import { ItemsNotFound } from '@shared/components/UI/ItemsNotFound/ItemsNotFound'
import { Space } from '@shared/components/UI/Spacing/Space'

import { CompareAttributes } from './CompareAttributes/CompareAttributes'
import { CompareTabs } from './CompareTabs/CompareTabs'
// import s from './compare.module.scss'

export const Compare = () => {
	const {
		range,
		setRange,
		comparesCategories,
		getActiveCompares,
		removeListFromCompare,
		removeItemFromCompare,
		activeCategory,
		setActiveCategory,
		removeAllCompares,
		calcCategoryItems,
		activeIndex,
		setActiveIndex,
	} = useCompareContext()
	const { addToWishlist } = useWishlistContext()
	const { addToCart } = useCartContext()

	return (
		<div className='container'>
			{comparesCategories().length > 0 ? (
				<>
					<CompareTabs
						categories={comparesCategories()}
						activeCategory={activeCategory}
						setActiveCategory={setActiveCategory}
						removeListFromCompare={removeListFromCompare}
						removeAllCompares={removeAllCompares}
						calcCategoryItems={calcCategoryItems}
					/>
					<CompareSlider
						getActiveCompares={getActiveCompares}
						activeCategory={activeCategory}
						activeIndex={activeIndex}
						setActiveIndex={setActiveIndex}
						removeItemFromCompare={removeItemFromCompare}
						setRange={setRange}
						addToWishlist={addToWishlist}
						addToCart={addToCart}
					/>
					{/*<CompareSlider*/}
					{/*	className={s.fixed}*/}
					{/*	type='small'*/}
					{/*	getActiveCompares={getActiveCompares}*/}
					{/*	activeCategory={activeCategory}*/}
					{/*	activeIndex={activeIndex}*/}
					{/*	setActiveIndex={setActiveIndex}*/}
					{/*	removeItemFromCompare={removeItemFromCompare}*/}
					{/*	setRange={setRange}*/}
					{/*	addToWishlist={addToWishlist}*/}
					{/*	addToCart={addToCart}*/}
					{/*/>*/}
					<CompareAttributes getActiveCompares={getActiveCompares} activeCategory={activeCategory} range={range} />
				</>
			) : (
				<ItemsNotFound type='compare' />
			)}
			<Space size='l' />
		</div>
	)
}
