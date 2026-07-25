import { Link } from 'react-router-dom'

import { useCompareContext } from '@context/CompareContext'

import CompareSVG from '@assets/svg/compare.svg?react'

import s from './compare-block.module.scss'

export const CompareBlock = ({ handlePopupClose }) => {
	const { calcTotalCompareItems } = useCompareContext()

	return (
		<Link className={s.box} to='/compare' onClick={() => handlePopupClose(false)}>
			<CompareSVG className={s.svg} />
			<div className={s.info}>
				<h6 className={s.title}>Compare products</h6>
				<span className={s.tip}>tap to manage</span>
			</div>
			<span className={s.total}>{calcTotalCompareItems()}</span>
		</Link>
	)
}
