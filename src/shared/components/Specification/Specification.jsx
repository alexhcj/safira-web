import React from 'react';
import s from './specification.module.scss'

export const Specification = ({company, producing_country, quantity, shelf_life}) => {
	return (
			<table className={s.table}>
				<tbody>
				{company && <tr>
					<td className={s.spec}>Company</td>
					<td className={s.spec_value}>{company}</td>
				</tr>}
				{producing_country && <tr>
					<td className={s.spec}>Producing country</td>
					<td className={s.spec_value}>{producing_country}</td>
				</tr>}
				{shelf_life && <tr>
					<td className={s.spec}>Shelf life</td>
					<td className={s.spec_value}>{shelf_life} (days)</td>
				</tr>}
				{quantity && <tr>
					<td className={s.spec}>Quantity</td>
					<td className={s.spec_value}>{quantity}</td>
				</tr>}
				</tbody>
			</table>
	);
};
