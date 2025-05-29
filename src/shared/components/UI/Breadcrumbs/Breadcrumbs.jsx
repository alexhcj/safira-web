import cn from 'classnames'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import { shallowEqual, slugToStr } from '@utils/index'

import { Space } from '../Spacing/Space'
import { Text } from '../Text/Text'

import s from './breadcrumbs.module.scss'

// types: 'page' (prevent state through for Breadcrumbs)
export const Breadcrumbs = ({ type = 'page' }) => {
	let { pathname, state } = useLocation()
	const navigate = useNavigate()
	const isMultiPaths = pathname.match(/\//g).length > 1
	const pagePathname = isMultiPaths
		? pathname.split('/').filter((path) => path)[0]
		: pathname.slice(1).replace('-', ' ')
	const pageDetailsItem = slugToStr(
		pathname
			.split('/')
			.filter((path) => path)
			.at(-1),
	)

	const categoryNavigate = (categoryType, category, index) => {
		const newState = {}
		Object.entries(JSON.parse(state))
			.slice(0, index + 1)
			.forEach((item) => {
				newState[item[0]] = item[1]
			})
		if (shallowEqual(JSON.parse(state), newState)) return
		navigate(`/shop?${categoryType}=${category}&${import.meta.env.VITE_SHOP_DEFAULT_QUERY}`, {
			state: JSON.stringify(newState),
		})
	}

	const renderCategories = (categories) => {
		return (
			categories &&
			Object.entries(categories).map(([key, value], index) => (
				<div className={s.category} key={value}>
					<Text span>/</Text>
					<div onClick={() => categoryNavigate(key, value, index)}>
						<Text className={cn(s.breadcrumb, s.link)} span>
							{slugToStr(value)}
						</Text>
					</div>
				</div>
			))
		)
	}

	return (
		<div className={s.section}>
			<div className={s.content}>
				<h3 className={s.page}>{pagePathname}</h3>
				<Space space={9} />
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
								{pageDetailsItem}
							</Text>
						</>
					)}
					{type === 'shop' && renderCategories(JSON.parse(state))}
					{/*{renderCategories(JSON.parse(state))}*/}
				</div>
			</div>
		</div>
	)
}
