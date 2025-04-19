import cn from 'classnames'
import { useNavigate } from 'react-router-dom'

import { ButtonCart } from '@shared/components/UI/Buttons/ButtonCart/ButtonCart'
import { Text } from '@shared/components/UI/Text/Text'

import CompareSVG from '@assets/svg/compare.svg?react'
import PlusSVG from '@assets/svg/plus.svg?react'

import s from './add-compare-item.module.scss'

export const AddCompareItem = ({ category }) => {
	const navigate = useNavigate()

	const handleAddCompareItem = () => {
		navigate(`/shop?basicCategory=${category}&${import.meta.env.VITE_SHOP_DEFAULT_QUERY}`)
	}

	const handleShowRelatedItem = () => {
		console.log('Open modal')
	}

	return (
		<div className={s.actions}>
			<ButtonCart className={s.button} type='button' onClick={() => handleAddCompareItem()}>
				<Text span weight='semi' className={s.button_text}>
					<PlusSVG className={s.svg} />
					Add product
				</Text>
			</ButtonCart>
			<ButtonCart className={cn(s.button, s.button_text_compare)} type='button' onClick={() => handleShowRelatedItem()}>
				<Text span weight='semi' className={s.button_text}>
					<CompareSVG className={cn(s.svg, s.svg_related)} />
					Show related
				</Text>
			</ButtonCart>
		</div>
	)
}
