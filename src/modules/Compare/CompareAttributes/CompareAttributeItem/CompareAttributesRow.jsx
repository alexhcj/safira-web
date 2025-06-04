import { camelToStr, capitalize, titleCase } from '@utils/string'

import s from './compare-attribute-item.module.scss'

export const CompareAttributesRow = ({ row: { values, attribute, different } }) => (
	<div className={s.row}>
		<h6 className={s.title}>
			{different && <span className={s.different_dot}></span>}
			{camelToStr(attribute)}:
		</h6>
		<div className={s.list}>
			{values.map((value, index) => (
				<span className={s.item} key={index}>
					{value}
				</span>
			))}
		</div>
	</div>
)
