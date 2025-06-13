import cn from 'classnames'

import { slugToStr } from '@utils/string'

import CloseSVG from '@assets/svg/close.svg?react'

import s from './compare-tab-item.module.scss'

export const CompareTabItem = ({ handleRemoveFromListCompare, category, activeCategory, totalCompares }) => {
	return (
		<li className={cn(s.category, { [s.active]: activeCategory === category })} key={category} data-category={category}>
			{slugToStr(category)}
			<span>{totalCompares}</span>
			{activeCategory === category && (
				<button onClick={(e) => handleRemoveFromListCompare(e, category)}>
					<CloseSVG className={s.close_svg} />
				</button>
			)}
		</li>
	)
}
