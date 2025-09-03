import { useSearchParams } from 'react-router-dom'

import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { Text } from '@shared/components/UI/Text/Text'

import s from './reset-filters.module.scss'

export const ResetFilters = () => {
	const [params, setParams] = useSearchParams()
	const currentParams = Object.fromEntries(params.entries())
	const defaultParams = Object.fromEntries(new URLSearchParams(import.meta.env.VITE_SHOP_DEFAULT_QUERY).entries())

	const handleResetFilters = () => {
		setParams(import.meta.env.VITE_SHOP_DEFAULT_QUERY)
	}

	const areParamsEqual = JSON.stringify(currentParams) === JSON.stringify(defaultParams)

	if (areParamsEqual) return null

	return (
		<div className={s.actions}>
			<Button className={s.btn} type='secondary' onClick={handleResetFilters}>
				Reset filters
			</Button>
		</div>
	)
}
