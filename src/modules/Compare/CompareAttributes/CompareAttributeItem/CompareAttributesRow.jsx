import { camelToStr, capitalizeIfStartsWithLetter } from '@utils/string'

import s from './compare-attribute-item.module.scss'

export const CompareAttributesRow = ({ row: { values, attribute, different }, visibleItems }) => (
	<div className={s.row}>
		<h6 className={s.title}>
			{different && <span className={s.different_dot}></span>}
			{camelToStr(attribute)}:
		</h6>
		<div
			className={s.list}
			// Drive the CSS custom property so SCSS can set grid-template-columns reactively
			style={{ '--visible-items': visibleItems }}
		>
			{values.map((value, index) => (
				<span className={s.item} key={`${attribute}-${index}`}>
					{capitalizeIfStartsWithLetter(value)}
				</span>
			))}
		</div>
	</div>
)
