import cn from 'classnames'
import { useSearchParams } from 'react-router-dom'

import { enumToStr } from '@utils/string'

import s from './dietary-filter.module.scss'

const dietaryTypesList = [
	'HALAL',
	'GLUTEN_FREE',
	'HEALTHIER_CHOICE',
	'HYPOALLERGENIC',
	'LACTOSE_FREE',
	'ORGANIC',
	'TRANS_FAT_FREE',
	'VEGETARIAN',
]

export const DietaryFilter = () => {
	const [params, setParams] = useSearchParams()

	const selectDietary = (dietary) => {
		const query = Object.fromEntries([...params])

		const newDietaries = !query.dietary
			? dietary
			: !query.dietary.split('+').includes(dietary)
				? `${query.dietary}+${dietary}`
				: query.dietary
						.split('+')
						.filter((d) => d !== dietary)
						.join('+')

		if (newDietaries) {
			setParams({ ...query, offset: '0', dietary: newDietaries })
		} else {
			params.delete('dietary')
			const query = Object.fromEntries([...params])
			setParams({ ...query, offset: '0' })
		}
	}

	return (
		<div className={s.dietaries}>
			{dietaryTypesList.map((dietary) => (
				<button
					className={cn(s.dietary, {
						[s.active]: params.get('dietary') && params.get('dietary').split('+').includes(dietary),
					})}
					key={dietary}
					onClick={() => selectDietary(dietary)}
				>
					{enumToStr(dietary)}
				</button>
			))}
		</div>
	)
}
