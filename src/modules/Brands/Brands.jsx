import { createRef, useEffect, useMemo, useRef, useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { useProductsNew } from '@hooks/services/useProductsNew'
import { useIntersection } from '@hooks/useIntersection'
import { useIsBelow } from '@hooks/useIsBelow'
import { usePassedElement } from '@hooks/usePassedElement'

import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { BrandsSkeleton } from '@shared/components/UI/Skeletons/BrandsSkeleton/BrandsSkeleton'
import { Text } from '@shared/components/UI/Text/Text'
import { BREAKPOINTS } from '@shared/data/breakpoints'

import { BrandsNav } from './BrandsNav/BrandsNav'
import { BrandsRow } from './BrandsRow/BrandsRow'

import s from './brands.module.scss'

export const Brands = () => {
	const navigate = useNavigate()
	const isTablet = useIsBelow(BREAKPOINTS.tablet)
	const triggerRef = useRef(null)
	const hasPassedBrands = usePassedElement(triggerRef, isTablet ? 100 : 36)
	const isFooterVisible = useIntersection('#footer')
	const isSticky = hasPassedBrands && !isFooterVisible
	const location = useLocation()
	const { findAllBrands, isLoading } = useProductsNew()
	const [brands, setBrands] = useState([])
	const isBrandsPage = location.pathname.slice(1) === 'brands'

	useEffect(() => {
		const fetchData = async () => {
			const res = await findAllBrands()

			if (res && res.success) {
				setBrands(res.brands)
			}
		}

		fetchData()
	}, [])

	const refs =
		brands &&
		brands.reduce((acc, cur) => {
			acc[cur.name] = createRef()
			return acc
		}, {})

	const handleCharAnchorClick = (name) => {
		refs[name].current.scrollIntoView({
			behavior: 'auto',
			block: 'start',
		})
	}

	const handleCategoriesNavigate = () => {
		navigate('/categories')
	}

	const handleBrandsNavigate = () => {
		navigate('/brands')
	}

	const availableChars = useMemo(() => brands.map((item) => item.name), [brands])

	return (
		<div className='container'>
			<div className={s.block}>
				<div>
					<span className={s.title}>Browse by</span>
					<div className={s.actions} ref={triggerRef}>
						<Button
							className={s.categories_action_btn}
							type={isBrandsPage ? 'secondary' : 'submit'}
							onClick={handleCategoriesNavigate}
						>
							<Text className={s.categories_btn} span>
								Categories
							</Text>
						</Button>
						<Button
							className={s.brands_action_btn}
							type={isBrandsPage ? 'submit' : 'secondary'}
							onClick={handleBrandsNavigate}
						>
							<Text className={s.brands_btn} span>
								Brands
							</Text>
						</Button>
						<BrandsNav chars={availableChars} onClick={handleCharAnchorClick} isSticky={isSticky} isTablet={isTablet} />
					</div>
				</div>
				<nav className={s.nav}>
					{isLoading ? (
						<BrandsSkeleton quantity={6} />
					) : (
						brands.map((item) => <BrandsRow {...item} key={item.name} rowRef={refs[item.name]} />)
					)}
				</nav>
			</div>
		</div>
	)
}
