import { useEffect, useMemo, useState } from 'react'

import cn from 'classnames'
import { NavLink } from 'react-router-dom'

import { slugToStr } from '@/utils'

import { useCategories } from '@hooks/services/useCategories'
import { useProductsNew } from '@hooks/services/useProductsNew'

import { Badge } from '@shared/components/UI/Badge/Badge'
import { ProductCategoriesSkeleton } from '@shared/components/UI/Skeletons/ProductCategoriesSkeleton/ProductCategoriesSkeleton'
import { ProductsByCategorySkeleton } from '@shared/components/UI/Skeletons/ProductsByCategorySkeleton/ProductsByCategorySkeleton'
import { NAVIGATION_ITEMS } from '@shared/data/site-map'

import s from './site-map.module.scss'

// Flattens the prime -> sub -> basic tree into a list of basic categories,
// each carrying the full breadcrumb trail for that branch.
const flattenCategoryTree = (tree = []) =>
	tree.flatMap((prime) =>
		prime.subCategories.items.flatMap((sub) =>
			sub.basicCategories.map((basic) => ({
				name: basic.name,
				slug: basic.basicCategory,
				breadcrumbs: [
					{ name: prime.name, slug: prime.primeCategory },
					{ name: sub.name, slug: sub.subCategory },
					{ name: basic.name, slug: basic.basicCategory },
				],
			})),
		),
	)

export const SiteMap = () => {
	const { findTree } = useCategories()
	const { findTopPopular, findTopByPrimeCategories, isLoading } = useProductsNew()
	const [basicCategories, setBasicCategories] = useState([])
	const [top20Products, setTop20Products] = useState([])
	const [primeCategories, setPrimeCategories] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const [categoryTreeRes, popularRes, primeCategoriesRes] = await Promise.all([
				findTree(),
				findTopPopular({ limit: 20 }),
				findTopByPrimeCategories(),
			])

			if (categoryTreeRes?.success) {
				setBasicCategories(flattenCategoryTree(categoryTreeRes.tree))
			}

			if (popularRes?.success) {
				setTop20Products(popularRes.products)
			}

			if (primeCategoriesRes?.success) {
				setPrimeCategories(primeCategoriesRes.categories)
			}
		}

		fetchData()
	}, [])

	const sortedBasicCategories = useMemo(
		() => [...basicCategories].sort((a, b) => (b.name[0] < a.name[0] ? 1 : -1)),
		[basicCategories],
	)

	return (
		<div className='container'>
			<div className={s.box}>
				<section className={s.section}>
					<div className={s.group}>
						<h3 className={s.title}>Pages</h3>
						<ul className={s.list}>
							{NAVIGATION_ITEMS.sort((a, b) => (b.page[0] < a.page[0] ? 1 : -1)).map(({ page, url, badge }, index) => (
								<li className={s.item} key={index}>
									<NavLink className={({ isActive }) => cn(s.url, { [s.active]: isActive })} to={url}>
										{page}
									</NavLink>
									{badge && <Badge className={s.badge} text={badge} />}
								</li>
							))}
						</ul>
					</div>
				</section>

				<section className={s.section}>
					<div className={s.group}>
						<h3 className={s.title}>Product categories</h3>
						{isLoading ? (
							<ProductCategoriesSkeleton quantity={26} />
						) : (
							<ul className={s.list}>
								{sortedBasicCategories.map(({ name, slug, breadcrumbs }, index) => (
									<li className={s.item} key={index}>
										<NavLink
											className={s.url}
											to={`/shop?basicCategory=${slug}&${import.meta.env.VITE_SHOP_DEFAULT_QUERY}`}
											state={JSON.stringify({ ...breadcrumbs })}
										>
											{name}
										</NavLink>
									</li>
								))}
							</ul>
						)}
					</div>

					<div className={s.group}>
						<h3 className={s.title}>Products top 20</h3>
						{isLoading ? (
							<ProductCategoriesSkeleton quantity={22} type='top-20' />
						) : (
							<ul className={cn(s.list, s.top_20)}>
								{top20Products
									.sort((a, b) => (b.name[0] < a.name[0] ? 1 : -1))
									.map(({ name, slug }, index) => (
										<li className={s.item} key={index}>
											<NavLink className={s.url} to={`/products/${slug}`}>
												{name}
											</NavLink>
										</li>
									))}
							</ul>
						)}
					</div>

					<div className={s.group}>
						<h3 className={s.title}>Products by category</h3>
						{isLoading ? (
							<ProductsByCategorySkeleton quantity={9} />
						) : (
							<div className={s.category_group}>
								{primeCategories
									.sort((a, b) => (b.category < a.category ? 1 : -1))
									.map((group) => ({
										products: group.products.sort((a, b) => (b.name[0] < a.name[0] ? 1 : -1)),
										category: group.category,
									}))
									.map((group, index) => (
										<li className={s.category_group_item} key={index}>
											<h6 className={s.category_group_title}>{slugToStr(group.category)}</h6>
											<ul className={s.category_list}>
												{group.products.map(({ name, slug }, index) => (
													<li className={s.group_list_item} key={index}>
														<NavLink className={s.url} to={`/products/${slug}`}>
															{name}
														</NavLink>
													</li>
												))}
											</ul>
										</li>
									))}
							</div>
						)}
					</div>
				</section>
			</div>
		</div>
	)
}
