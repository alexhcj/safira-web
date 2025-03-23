import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ImageWithFallback } from '../../../utils/ImageWithFallback'
import s from './category-card.module.scss'

export const CategoryCard = ({ category }) => {
	const navigate = useNavigate()
	const { name, primeCategory, subCategories } = category
	const img = `${process.env.REACT_APP_WEB_PUBLIC_URL}/assets/images/categories/${primeCategory}.jpg`

	const handlePrimeCategoryClick = () => {
		const query = `primeCategory=${primeCategory}&${process.env.REACT_APP_SHOP_DEFAULT_QUERY}`
		navigate(`/shop?${new URLSearchParams(query)}`, {
			state: JSON.stringify({ primeCategory }),
		})
	}

	return (
		<div className={s.card}>
			<div className={s.header} onClick={handlePrimeCategoryClick}>
				<ImageWithFallback className={s.img} onlySrc src={img} alt={`${name} category`} />
				<div>
					<h3 className={s.category}>{name}</h3>
					<span className={s.text_all}>View all</span>
				</div>
			</div>
			{subCategories && subCategories.length !== 0 && (
				<ul className={s.list}>
					{subCategories.items.map(({ subCategory, name }, index) => {
						const handleSubCategoryClick = () => {
							const query = `subCategory=${subCategory}&${process.env.REACT_APP_SHOP_DEFAULT_QUERY}`
							navigate(`/shop?${new URLSearchParams(query)}`, {
								state: JSON.stringify({ subCategory }),
							})
						}

						return (
							<li className={s.sub_category} key={index} onClick={handleSubCategoryClick}>
								{name}
							</li>
						)
					})}
				</ul>
			)}
		</div>
	)
}
