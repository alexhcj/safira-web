import React from 'react'
import s from './specification.module.scss'

export const Specification = ({ company, producingCountry, quantity, shelf_life }) => {
	return (
		<table className={s.table}>
			<tbody>
				{company && (
					<tr>
						<td className={s.spec}>Company</td>
						<td className={s.spec_value}>{company}</td>
					</tr>
				)}
				{producingCountry && (
					<tr>
						<td className={s.spec}>Producing country</td>
						<td className={s.spec_value}>{producingCountry}</td>
					</tr>
				)}
				{shelf_life && (
					<tr>
						<td className={s.spec}>Shelf life</td>
						<td className={s.spec_value}>{shelf_life} (days)</td>
					</tr>
				)}
				{quantity && (
					<tr>
						<td className={s.spec}>Quantity</td>
						<td className={s.spec_value}>{quantity}</td>
					</tr>
				)}
			</tbody>
		</table>
	)
}
