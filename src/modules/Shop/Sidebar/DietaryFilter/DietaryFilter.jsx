import { useEffect, useState } from 'react'

import cn from 'classnames'
import { useSearchParams } from 'react-router-dom'

import { useProductsNew } from '@hooks/services/useProductsNew'
import { useTags } from '@hooks/services/useTags'

import { enumToStr } from '@utils/string'

import s from './dietary-filter.module.scss'

export const DietaryFilter = () => {
	const [params, setParams] = useSearchParams()
	const { findUniqueDietaryTags } = useTags()
	const { findQueryTags } = useProductsNew()
	const [tags, setTags] = useState([])
	const [availableTags, setAvailableTags] = useState([])

	const { primeCategory, subCategory, basicCategory, minPrice, maxPrice, slug, brand } = Object.fromEntries([...params])

	useEffect(() => {
		const fetchData = async () => {
			const res = await findUniqueDietaryTags()

			if (res && res.success) {
				setTags(res.tags)
			}
		}

		fetchData()
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			const queryWithoutTags = { ...Object.fromEntries([...params]) }

			if (queryWithoutTags.dietary) {
				delete queryWithoutTags.dietary
			}

			const res = await findQueryTags(queryWithoutTags)

			if (res && res.success) {
				setAvailableTags(res.tags)
			}
		}

		fetchData()
	}, [primeCategory, subCategory, basicCategory, minPrice, maxPrice, slug, brand])

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

	const filterTags = () => {
		return tags.filter((tag) => availableTags.includes(tag))
	}

	if (availableTags.length === 0) {
		return <div className={s.no_tags}>No tags found for the current selection</div>
	}

	return (
		<div className={s.dietaries}>
			{filterTags().map((dietary) => (
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
