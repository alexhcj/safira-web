import React from 'react'
import { ReactComponent as HalalSVG } from '../../../../assets/svg/dietaries/halal.svg'
import { ReactComponent as GlutenFreeSVG } from '../../../../assets/svg/dietaries/gluten-free.svg'
import { ReactComponent as HealthierChoiceSVG } from '../../../../assets/svg/dietaries/healthier-choice.svg'
import { ReactComponent as HypoallergenicSVG } from '../../../../assets/svg/dietaries/hypoallergenic.svg'
import { ReactComponent as LactoseFreeSVG } from '../../../../assets/svg/dietaries/lactose-free.svg'
import { ReactComponent as OrganicSVG } from '../../../../assets/svg/dietaries/organic.svg'
import { ReactComponent as TransFatFreeSVG } from '../../../../assets/svg/dietaries/trans-fat-free.svg'
import { ReactComponent as VegetarianSVG } from '../../../../assets/svg/dietaries/vegetarian.svg'
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

export const DietaryTags = ({ tags }) => {
	const dietaryTags = tags.map((tag) => (
		<div className={s.tag} key={tag}>
			{dietaryTagsType[tag]}
		</div>
	))

	return <div className={s.tags}>{dietaryTags}</div>
}
