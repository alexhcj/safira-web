import { useState } from 'react'

import cn from 'classnames'

import { CompareAttributesRow } from './CompareAttributeItem/CompareAttributesRow'

import s from './compare-attributes.module.scss'

export const CompareAttributes = ({ getActiveCompares, activeCategory, range }) => {
	const [showOnlyDifferent, setShowOnlyDifferent] = useState(false)

	const combineCompareAttributesRows = () => {
		let rows = []

		const allAttributesKeys =
			getActiveCompares(activeCategory) &&
			Object.keys(Object.assign({}, ...getActiveCompares(activeCategory).map((rows) => rows.specifications)))

		getActiveCompares(activeCategory) &&
			allAttributesKeys.forEach((attrKey, index) => {
				rows.push({ attribute: attrKey, different: false, values: [] })
				getActiveCompares(activeCategory).forEach(({ specifications }) => {
					rows[index].values.push(specifications[attrKey] ? specifications[attrKey] : '-')
				})
			})

		return rows
	}

	const markDifferentAttributesRows = (arr) => {
		if (arr.length === 1) return arr

		return arr.map((item) => {
			if (new Set(item.values).size > 1) {
				item.different = true
			}

			return item
		})
	}

	const pickRowsInRange = (rows, range) => {
		return rows.map((item) => {
			return {
				...item,
				values: item.values.filter((value, index) => index >= range.first && index <= range.last && value),
			}
		})
	}

	const renderRows = (rows, different) => {
		if (different) {
			return rows.filter((row) => row.different)
		}

		return rows
	}

	const handleSetShowDifferentAttrs = () => {
		setShowOnlyDifferent(!showOnlyDifferent)
	}

	return (
		<div className={s.block}>
			<div className={s.header}>
				<h3 className={s.title}>Compare Attributes</h3>
				<button className={s.btn_different} type='button' onClick={handleSetShowDifferentAttrs}>
					<span className={s.different_circle}>
						<span className={s.different_dot}></span>
					</span>
					<span className={cn(s.btn_different_switcher, { [s.active]: showOnlyDifferent })}>
						<span className={cn(s.btn_different_switcher_square, { [s.active]: showOnlyDifferent })}></span>
					</span>
					Show different
				</button>
			</div>
			<div className={s.list}>
				{renderRows(
					pickRowsInRange(markDifferentAttributesRows(combineCompareAttributesRows()), range),
					showOnlyDifferent,
				).map((row) => (
					<CompareAttributesRow key={row.attribute} row={row} />
				))}
			</div>
		</div>
	)
}
