import cn from 'classnames'

import GlutenFreeSVG from '@assets/svg/dietaries/gluten-free.svg?react'
import HalalSVG from '@assets/svg/dietaries/halal.svg?react'
import HealthierChoiceSVG from '@assets/svg/dietaries/healthier-choice.svg?react'
import HypoallergenicSVG from '@assets/svg/dietaries/hypoallergenic.svg?react'
import LactoseFreeSVG from '@assets/svg/dietaries/lactose-free.svg?react'
import OrganicSVG from '@assets/svg/dietaries/organic.svg?react'
import TransFatFreeSVG from '@assets/svg/dietaries/trans-fat-free.svg?react'
import VegetarianSVG from '@assets/svg/dietaries/vegetarian.svg?react'

import s from './dietary-tags.module.scss'

const dietaryTagsType = {
	HALAL: <HalalSVG />,
	GLUTEN_FREE: <GlutenFreeSVG />,
	HEALTHIER_CHOICE: <HealthierChoiceSVG />,
	HYPOALLERGENIC: <HypoallergenicSVG />,
	LACTOSE_FREE: <LactoseFreeSVG />,
	ORGANIC: <OrganicSVG />,
	TRANS_FAT_FREE: <TransFatFreeSVG />,
	VEGETARIAN: <VegetarianSVG />,
}

// sizes: 'sm' | 'md'
export const DietaryTags = ({ tags, size = 'sm', className }) => {
	const dietaryTags =
		tags &&
		tags.map((tag) => (
			<div className={s.tag} key={tag}>
				{dietaryTagsType[tag]}
			</div>
		))

	return <div className={cn(s.tags, s[`size_${size}`], className)}>{dietaryTags}</div>
}
