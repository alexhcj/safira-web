import { capitalizeIfStartsWithLetter } from '@/utils'

import s from './spec-table.module.scss'

/**
 * @typedef {Object} SpecRow
 * @property {string|number} [key]        - React key. Falls back to row index if omitted.
 * @property {React.ReactNode} label       - left-hand column content
 * @property {React.ReactNode} value       - right-hand column content
 */

/**
 * Generic, presentation-only key/value table for product spec-style data
 * (e.g. "Specifications", "Nutritional data", and future spec blocks).
 *
 * This component has no domain knowledge: it does not decide which rows are
 * optional, how values are formatted, or what fields exist for a given
 * product type. Callers are responsible for building the final `rows` array
 * (filtering out rows that shouldn't render, formatting values, etc.)
 * before passing it in.
 *
 * @param {Object} props
 * @param {SpecRow[]} props.rows - rows to render, in display order
 * @param {[React.ReactNode, React.ReactNode]} [props.headers] - optional
 *   column header labels, e.g. `['Attributes', 'Per Serving (50g)']`.
 *   Omit for tables that shouldn't show a header row (e.g. Specifications).
 * @param {string} [props.className] - extra class name(s) applied to the <table>
 */
export const SpecTable = ({ rows, headers, className }) => {
	return (
		<table className={[s.table, className].filter(Boolean).join(' ')}>
			{headers && (
				<thead>
					<tr>
						<th className={s.head}>{headers[0]}</th>
						<th className={s.head_value}>{headers[1]}</th>
					</tr>
				</thead>
			)}
			<tbody>
				{rows.map(({ key, label, value }, idx) => (
					<tr key={key ?? idx}>
						<td className={s.spec}>{label}</td>
						<td className={s.spec_value}>{capitalizeIfStartsWithLetter(value)}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
