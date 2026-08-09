import { useNavigate } from 'react-router-dom'

import { ImageWithFallback } from '@shared/components/ImageWithFallback/ImageWithFallback'

import s from './category-card.module.scss'

export const CategoryCard = ({ category }) => {
	const navigate = useNavigate()
	const { name: primeCategoryName, primeCategory, subCategories } = category
	const img = `${import.meta.env.VITE_WEB_PUBLIC_URL}/assets/images/categories/${primeCategory}/72x72.jpg`

	const handlePrimeCategoryClick = () => {
		const query = `primeCategory=${primeCategory}&${import.meta.env.VITE_SHOP_DEFAULT_QUERY}`
		navigate(`/shop?${new URLSearchParams(query)}`, {
			state: JSON.stringify({ primeCategory: { name: primeCategoryName, slug: primeCategory } }),
		})
	}

	return (
		<div className={s.card}>
			<div className={s.header} onClick={handlePrimeCategoryClick}>
				<ImageWithFallback className={s.img} onlySrc src={img} alt={`${primeCategoryName} category`} />
				<div>
					<h3 className={s.category}>{primeCategoryName}</h3>
					<span className={s.text_all}>View all</span>
				</div>
			</div>
			{subCategories && subCategories.length !== 0 && (
				<ul className={s.list}>
					{subCategories.items.map(({ subCategory, name: subCategoryName }, index) => {
						const handleSubCategoryClick = () => {
							const query = `subCategory=${subCategory}&${import.meta.env.VITE_SHOP_DEFAULT_QUERY}`
							navigate(`/shop?${new URLSearchParams(query)}`, {
								state: JSON.stringify({
									primeCategory: { name: primeCategoryName, slug: primeCategory },
									subCategory: { name: subCategoryName, slug: subCategory },
								}),
							})
						}

						return (
							<li className={s.sub_category} key={index} onClick={handleSubCategoryClick}>
								{subCategoryName}
							</li>
						)
					})}
				</ul>
			)}
		</div>
	)
}
