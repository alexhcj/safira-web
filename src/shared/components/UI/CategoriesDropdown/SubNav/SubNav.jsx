import cn from 'classnames'
import { useNavigate } from 'react-router-dom'

import { useAccordion } from '@hooks/useAccordion'

import { AccordionItem } from '@shared/components/UI/CategoriesDropdown/AccordionItem/AccordionItem'

import s from './sub-nav.module.scss'

export const SubNav = ({
	subNavToggleCategory,
	setPopupToggle,
	resetAccordion,
	primeCategory,
	primeCategoryName,
	subCategories: { items, parentCategory },
	isTablet,
}) => {
	const navigate = useNavigate()

	const buildQuery = (key, id) => ({
		[key]: id,
		limit: '12',
		offset: '0',
		sort: 'popularity',
		order: 'desc',
	})

	const navigateTo = (query, state) => {
		navigate(`/shop?${new URLSearchParams(query)}`, { state: JSON.stringify(state) })
		setPopupToggle(false)
		resetAccordion?.()
	}

	const accordion = useAccordion((subCategoryId) => {
		const sub = items.find((i) => i.subCategory === subCategoryId)
		navigateTo(buildQuery('subCategory', subCategoryId), {
			primeCategory: { name: primeCategoryName, slug: primeCategory },
			subCategory: { name: sub?.name, slug: subCategoryId },
		})
	})

	// Desktop click handler
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

		navigateTo(buildQuery(isSubCategory ? 'subCategory' : 'basicCategory', e.target.id), {
			primeCategory: { name: primeCategoryName, slug: primeCategory },
			subCategory,
			basicCategory,
		})
	}

	// Tablet render
	if (isTablet) {
		return (
			<ul className={cn(s.nav, s.tablet)}>
				{items.map((sub) => {
					const hasChildren = !!sub.basicCategories?.length
					return (
						<AccordionItem
							key={sub.subCategory}
							label={sub.name}
							isLeaf={!hasChildren}
							isOpen={accordion.openId === sub.subCategory}
							isPending={accordion.pendingId === sub.subCategory}
							onRowTap={() => accordion.handleRowTap(sub.subCategory)}
							onCollapse={() => accordion.handleCollapse(sub.subCategory)}
						>
							{sub.basicCategories
								?.sort((a, b) => (b.name[0] < a.name[0] ? 1 : -1))
								.map((basic) => (
									<AccordionItem
										key={basic.basicCategory}
										label={basic.name}
										isLeaf
										onRowTap={() =>
											navigateTo(buildQuery('basicCategory', basic.basicCategory), {
												primeCategory: { name: primeCategoryName, slug: primeCategory },
												subCategory: { name: sub.name, slug: sub.subCategory },
												basicCategory: { name: basic.name, slug: basic.basicCategory },
											})
										}
									/>
								))}
						</AccordionItem>
					)
				})}
			</ul>
		)
	}

	return (
		<nav className={cn(s.nav, subNavToggleCategory === parentCategory && s.active)} onClick={onClickHandler}>
			{items.map((subCategory) => (
				<ul className={s.item} key={subCategory.subCategory}>
					<h5 className={s.title} id={subCategory.subCategory} data-name={subCategory.name}>
						{subCategory.name}
					</h5>
					{subCategory.basicCategories
						?.sort((a, b) => (b.name[0] < a.name[0] ? 1 : -1))
						.map((basicCategory) => (
							<li
								className={s.link}
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
