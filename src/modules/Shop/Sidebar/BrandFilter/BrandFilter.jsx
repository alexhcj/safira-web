import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import cn from 'classnames'
import { productsAPI } from '../../../../api/products'
import { CheckboxFilter } from '../../../../shared/components/UI/Checkbox/CheckboxFilter'
import { brandToSlug } from '../../../../utils'
import s from './brand-filter.module.scss'

export const BrandFilter = () => {
	const [params, setParams] = useSearchParams()
	const [availableBrands, setAvailableBrands] = useState([])
	const [showMore, setShowMore] = useState(false)
	const { category, subCategory, minPrice, maxPrice, slug } = Object.fromEntries([...params])

	useEffect(() => {
		const query = Object.fromEntries([...params])

		const fetchData = async () => {
			try {
				const { brands } = await productsAPI.getQueryBrands(query)
				setAvailableBrands(sortBrands(brands, 'a-z'))
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [category, subCategory, minPrice, maxPrice, slug])

	const selectBrandHandler = (brand) => {
		const query = Object.fromEntries([...params])
		const newBrands = !query.brand
			? brand
			: !query.brand.split('+').includes(brand)
			? `${query.brand}+${brand}`
			: query.brand
					.split('+')
					.filter((b) => b !== brand)
					.join('+')

		if (newBrands) {
			setParams({ ...query, offset: '0', brand: newBrands })
		} else {
			params.delete('brand')
			const query = Object.fromEntries([...params])
			setParams({ ...query, offset: '0' })
		}
	}

	const sortBrands = (brands, sortType = 'a-z') => {
		switch (!!brands) {
			case sortType === 'a-z':
				return [...brands].sort((a, b) => b.brand[0] - a.brand[0])
			case sortType === 'popularity':
				return [...brands].sort((a, b) => b.popularity - a.popularity)
			default:
				return brands
		}
	}

	const isBrandChecked = (brand) => {
		const query = Object.fromEntries([...params])
		return !query.brand ? false : query.brand.split('+').includes(brand)
	}

	const toggleShowMore = () => {
		setShowMore(!showMore)
	}

	return (
		<>
			<div className={cn(s.brands, { [s.active]: showMore && availableBrands.length > 5 })}>
				{sortBrands(availableBrands, showMore ? 'a-z' : 'popularity').map(({ brand, quantity }, index) => {
					return (
						index <= (showMore ? Infinity : 4) && (
							<CheckboxFilter
								className={s.brand_item}
								isChecked={isBrandChecked(brandToSlug(brand))}
								key={brandToSlug(brand)}
								onClick={() => selectBrandHandler(brandToSlug(brand))}
							>
								<span className={s.brand}>{brand}</span>
								<span className={s.quantity}>({quantity})</span>
							</CheckboxFilter>
						)
					)
				})}
			</div>
			{availableBrands.length > 5 && (
				<button className={s.show_more} onClick={() => toggleShowMore(showMore)}>
					{showMore ? 'Show less' : 'Show more'}
				</button>
			)}
		</>
	)
}
