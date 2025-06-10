import { useCompareContext } from '@context/CompareContext'

import { CompareSlider } from '@shared/components/Slider/CompareSlider/CompareSlider'
import { ItemsNotFound } from '@shared/components/UI/ItemsNotFound/ItemsNotFound'
import { Space } from '@shared/components/UI/Spacing/Space'

import { CompareAttributes } from './CompareAttributes/CompareAttributes'
import { CompareTabs } from './CompareTabs/CompareTabs'

export const Compare = () => {
	const {
		activeIndex,
		setActiveIndex,
		comparesCategories,
		getActiveCompares,
		removeListFromCompare,
		activeCategory,
		removeItemFromCompare,
		setActiveCategory,
		removeAllCompares,
		calcCategoryItems,
	} = useCompareContext()

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
						removeItemFromCompare={removeItemFromCompare}
						activeCategory={activeCategory}
						activeIndex={activeIndex}
						setActiveIndex={setActiveIndex}
					/>
					<CompareAttributes
						getActiveCompares={getActiveCompares}
						activeCategory={activeCategory}
						activeIndex={activeIndex}
					/>
				</>
			) : (
				<ItemsNotFound type='compare' />
			)}
			<Space size='l' />
		</div>
	)
}
