import cn from 'classnames'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import { useIsBelow } from '@hooks/useIsBelow'

import { BREAKPOINTS } from '@shared/data/breakpoints'

import { getBreadcrumbLabel, safeParseState, shallowEqual } from '@utils/index'

import { Text } from '../Text/Text'

import s from './breadcrumbs.module.scss'

/**
 * @typedef {'page' | 'product' | 'shop'} BreadcrumbType
 * - 'page'    - a static page (about, legal, etc). No state is expected/used.
 * - 'product' - a product detail page. Expects `location.state` to be a
 *               JSON string of `{ name, slug?, ... }` describing the product's
 *               category context.
 * - 'shop'    - the shop listing page. Expects `location.state` to be a
 *               JSON string of an ordered map of
 *               `{ [categoryType]: { name, slug } }` representing the active
 *               category filter chain.
 */

/**
 * Breadcrumbs navigation trail.
 *
 * Renders "Home / <page or category chain>" and, for 'shop', lets the user
 * click back to any ancestor category to re-navigate with a trimmed filter
 * state.
 *
 * Label resolution for every segment goes through `getBreadcrumbLabel`
 * (see breadcrumbLabel.js) so a given slug always displays the same way
 * regardless of which page/nav-path produced it. Static route labels that
 * can't be derived from a slug (e.g. "privacy-policy" -> "Privacy & Policy")
 * live in `@shared/data/routeLabels`.
 *
 * KNOWN UPSTREAM ISSUE (not fixable from this component alone): when
 * navigating to a product page from a product card, the card currently
 * builds `state.name` itself by running the category slug through a plain
 * slug->string transform, instead of looking up the category's real `name`
 * from the shared categories source. That produces an unformatted name
 * (e.g. missing "&") even though this component renders it correctly here.
 * Fix belongs in the product card / wherever that state is constructed -
 * it should pass the category's already-correct `name`, not re-derive one.
 *
 * @param {object} props
 * @param {BreadcrumbType} [props.type='page'] - which state shape to expect/render
 */
export const Breadcrumbs = ({ type = 'page' }) => {
	const isMobileL = useIsBelow(BREAKPOINTS.mobileL)
	const isTablet = useIsBelow(BREAKPOINTS.tablet)
	const { pathname, state: rawState } = useLocation()
	const navigate = useNavigate()

	const state = safeParseState(rawState)

	const pathSegments = pathname.split('/').filter(Boolean)
	const isMultiPaths = pathSegments.length > 1

	// First segment for multi-part paths (e.g. "/shop/..."), or the whole
	// path for single-segment routes (e.g. "/privacy-policy").
	const pagePathname = isMultiPaths ? pathSegments[0] : (pathSegments[0] ?? '')

	// Last segment, used as the fallback breadcrumb label when there's no
	// richer `state` to describe the current page.
	const pageDetailsSlug = pathSegments.at(-1)

	/**
	 * Re-navigates to `/shop` filtered up through (and including) the
	 * clicked category, trimming everything deeper than it out of state.
	 *
	 * @param {string} categoryType - the filter key, e.g. "brand"
	 * @param {string} category - the category's slug
	 * @param {number} index - position of the clicked category in the chain
	 */
	const categoryNavigate = (categoryType, category, index) => {
		if (!state) return

		const newState = Object.fromEntries(Object.entries(state).slice(0, index + 1))

		if (shallowEqual(state, newState)) return

		navigate(`/shop?${categoryType}=${category}&${import.meta.env.VITE_SHOP_DEFAULT_QUERY}`, {
			state: JSON.stringify(newState),
		})
	}

	/**
	 * Renders the clickable category chain for the 'shop' breadcrumb type.
	 * Truncates leading categories on smaller breakpoints to save space.
	 *
	 * @param {Record<string, {name: string, slug: string}> | null} categories
	 */
	const renderCategories = (categories) => {
		if (!categories) return null

		const categoriesArr = Object.entries(categories)
		const maxVisible = isMobileL ? 1 : isTablet ? 2 : categoriesArr.length
		const startIndex = Math.max(0, categoriesArr.length - maxVisible)

		return categoriesArr.slice(startIndex).map(([key, value], index) => {
			const { name, slug } = value

			return (
				<div className={s.category} key={slug}>
					<Text span>/</Text>

					<div onClick={() => categoryNavigate(key, slug, index)}>
						<Text className={cn(s.breadcrumb, s.link)} span>
							{getBreadcrumbLabel(slug, name)}
						</Text>
					</div>
				</div>
			)
		})
	}

	return (
		<div className={s.section}>
			<div className={s.content}>
				<h3 className={s.page}>{getBreadcrumbLabel(pagePathname)}</h3>
				<div className={s.breadcrumbs}>
					<div>
						<NavLink to='/' className={cn(s.breadcrumb, s.link)}>
							Home
						</NavLink>
					</div>

					{pathname && !state && (
						<>
							<Text span>/ </Text>
							<Text className={s.page_breadcrumb} span>
								{getBreadcrumbLabel(pageDetailsSlug)}
							</Text>
						</>
					)}

					{type === 'product' && state && (
						<>
							<Text span>/ </Text>
							<Text className={s.page_breadcrumb} span>
								{getBreadcrumbLabel(state.slug, state.name)}
							</Text>
						</>
					)}

					{type === 'shop' && renderCategories(state)}
				</div>
			</div>
		</div>
	)
}
