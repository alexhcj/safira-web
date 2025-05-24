import s from './specification.module.scss'

export const Specification = ({ company, producingCountry, quantity, shelfLife }) => {
	return (
		<table className={s.table}>
			<tbody>
				{company && (
					<tr>
						<td className={s.spec}>Company</td>
						<td className={s.spec_value}>{company.displayName}</td>
					</tr>
				)}
				{producingCountry && (
					<tr>
						<td className={s.spec}>Producing country</td>
						<td className={s.spec_value}>{producingCountry}</td>
					</tr>
				)}
				{shelfLife && (
					<tr>
						<td className={s.spec}>Shelf life</td>
						<td className={s.spec_value}>
							{shelfLife.value} ({shelfLife.unit})
						</td>
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
