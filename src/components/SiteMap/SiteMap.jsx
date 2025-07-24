import { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'

import { slugToStr } from '@/utils'

import { useProductsNew } from '@hooks/services/useProductsNew'

import { siteMap } from '@components/SiteMap/site-map.data'

import { Badge } from '@shared/components/UI/Badge/Badge'

import s from './site-map.module.scss'

export const SiteMap = () => {
	const { findAllBasicCategories, findTopPopular, findTopByPrimeCategories, isLoading } = useProductsNew()
	const [productsCategories, setProductsCategories] = useState([])
	const [top20Products, setTop20Products] = useState([])
	const [primeCategories, setPrimeCategories] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const [basicCategoriesRes, popularRes, primeCategoriesRes] = await Promise.all([
				findAllBasicCategories(),
				findTopPopular({ limit: 20 }),
				findTopByPrimeCategories(),
			])

			if (basicCategoriesRes?.success) {
				setProductsCategories(basicCategoriesRes.categories)
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

	return (
		<div className='container'>
			<div className={s.box}>
				<section className={s.section}>
					<div className={s.group}>
						<h3 className={s.title}>Pages</h3>
						<ul className={s.list}>
							{siteMap.pages
								.sort((a, b) => (b.page[0] < a.page[0] ? 1 : -1))
								.map(({ page, url, badge }, index) => (
									<li className={s.item} key={index}>
										<NavLink className={s.url} to={url}>
											{page}
										</NavLink>
										{badge && <Badge text={badge} />}
									</li>
								))}
						</ul>
					</div>
				</section>

				<section className={s.section}>
					<div className={s.group}>
						<h3 className={s.title}>Product categories</h3>
						<ul className={s.list}>
							{!isLoading &&
								productsCategories
									.sort((a, b) => (b[0] < a[0] ? 1 : -1))
									.map((basicCategory, index) => (
										<li className={s.item} key={index}>
											<NavLink
												className={s.url}
												to={`/shop?basicCategory=${basicCategory}&${import.meta.env.VITE_SHOP_DEFAULT_QUERY}`}
											>
												{slugToStr(basicCategory)}
											</NavLink>
										</li>
									))}
						</ul>
					</div>

					<div className={s.group}>
						<h3 className={s.title}>Products top 20</h3>
						<ul className={s.list}>
							{!isLoading &&
								top20Products
									.sort((a, b) => (b.name[0] < a.name[0] ? 1 : -1))
									.map(({ name, slug }, index) => (
										<li className={s.item} key={index}>
											<NavLink className={s.url} to={`/products/${slug}`}>
												{name}
											</NavLink>
										</li>
									))}
						</ul>
					</div>

					<div className={s.group}>
						<h3 className={s.title}>Products by category</h3>
						<div className={s.category_group}>
							{!isLoading &&
								primeCategories
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
					</div>
				</section>
			</div>
		</div>
	)
}
