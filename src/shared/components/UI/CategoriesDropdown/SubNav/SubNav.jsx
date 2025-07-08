import cn from 'classnames'
import { useNavigate } from 'react-router-dom'

import s from './sub-nav.module.scss'

export const SubNav = ({
	subNavToggleCategory,
	setPopupToggle,
	primeCategory,
	primeCategoryName,
	subCategories: { items, parentCategory },
}) => {
	const navigate = useNavigate()

	const onClickHandler = (e) => {
		e.stopPropagation()
		const isSubCategory = e.target.nodeName === 'H5'
		const subCategory = isSubCategory
			? { name: e.target.dataset.name, slug: e.target.id }
			: {
					name: items.find((item) => item.subCategory === e.target.dataset.subcategory).name,
					slug: e.target.dataset.subcategory,
				}
		const basicCategory = !isSubCategory ? { name: e.target.dataset.name, slug: e.target.id } : undefined
		const category = isSubCategory ? 'subCategory' : 'basicCategory'

		const query = {
			[category]: e.target.id,
			limit: '12',
			offset: '0',
			sort: 'popularity',
			order: 'desc',
		}

		navigate(`/shop?${new URLSearchParams(query)}`, {
			state: JSON.stringify({
				primeCategory: {
					name: primeCategoryName,
					slug: primeCategory,
				},
				subCategory,
				basicCategory,
			}),
		})
		setPopupToggle(false)
	}

	return (
		<nav className={cn(s.nav_sub, subNavToggleCategory === parentCategory && s.active)} onClick={onClickHandler}>
			{items.map((subCategory) => (
				<ul className={s.sub_category_item} key={subCategory.subCategory}>
					<h5 className={s.sub_category_title} id={subCategory.subCategory} data-name={subCategory.name}>
						{subCategory.name}
					</h5>
					{subCategory.basicCategories
						.sort((a, b) => (b.name[0] < a.name[0] ? 1 : -1))
						.map((basicCategory) => (
							<li
								className={s.sub_category_link}
								key={basicCategory.basicCategory}
								id={basicCategory.basicCategory}
								data-name={basicCategory.name}
								data-subcategory={subCategory.subCategory}
								data-subcategory-name={subCategory.name}
							>
								{basicCategory.name}
							</li>
						))}
				</ul>
			))}
		</nav>
	)
}
