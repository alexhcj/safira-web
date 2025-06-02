import { useEffect, useState } from 'react'

import cn from 'classnames'
import { useSearchParams } from 'react-router-dom'
import ReactSlider from 'react-slider'

import { productsAPI } from '@api/products'

import { ButtonFilter } from '@shared/components/UI/Buttons/ButtonFilter/ButtonFilter'

import Close from '@assets/svg/close.svg?react'

import s from './price-range.module.scss'
import './react-slider.css'

export const PriceRange = () => {
	const [params, setParams] = useSearchParams()
	const { category, subCategory, minPrice, maxPrice, slug, brand, dietary } = Object.fromEntries([...params])
	const [priceRanges, setPriceRanges] = useState([0, 0])
	const [price, setPrice] = useState([+minPrice || 0, +maxPrice || 0])
	const [showResetPrice, setShowResetPrice] = useState(false)

	const filterPriceHandler = () => {
		const query = Object.fromEntries([...params])
		setParams({ ...query, minPrice: `${price[0]}`, maxPrice: `${price[1]}` })
	}

	useEffect(() => {
		const query = Object.fromEntries([...params])

		const fetchData = async () => {
			try {
				const { minPrice: initMin, maxPrice: initMax } = await productsAPI.getQueryPriceRange(query)
				setPriceRanges([+initMin || 0, +initMax || 0])

				if (!minPrice && !maxPrice) {
					setPrice([+initMin, +initMax])
				}

				if (minPrice < initMin || maxPrice > initMax) {
					setParams({ ...query, minPrice: `${initMin}`, maxPrice: `${initMax}` })
					setPrice([+initMin, +initMax])
				}
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [category, subCategory, slug, brand, dietary])

	const resetPriceRange = () => {
		params.delete('minPrice')
		params.delete('maxPrice')
		const query = Object.fromEntries([...params])
		setParams({ ...query })

		// updates available price range
		const fetchData = async () => {
			try {
				const { minPrice, maxPrice } = await productsAPI.getQueryPriceRange(query)
				setPriceRanges([+minPrice || 0, +maxPrice || 0])
				setPrice([minPrice, maxPrice])
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}

	return (
		<div className={s.box}>
			<ReactSlider
				className={s.slider}
				thumbClassName={s.thumb}
				onChange={setPrice}
				defaultValue={priceRanges}
				value={price}
				step={0.01}
				min={priceRanges[0]}
				max={priceRanges[1]}
			/>
			<div className={s.bottom}>
				<ButtonFilter onClick={filterPriceHandler} />
				<div
					className={cn(s.thumbs, { [s.active]: minPrice && maxPrice })}
					onMouseEnter={() => setShowResetPrice(!showResetPrice)}
					onMouseLeave={() => setShowResetPrice(!showResetPrice)}
				>
					${price[0]} - ${price[1]}
					{minPrice && maxPrice && (
						<button
							className={cn(s.reset_price, { [s.active]: showResetPrice })}
							onClick={resetPriceRange}
							type='button'
						>
							<Close className={s.reset_svg} />
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
