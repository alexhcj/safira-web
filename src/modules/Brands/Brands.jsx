import React, { createRef, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useBrands } from '../../hooks/services/useBrands'
import { BrandsNav } from './BrandsNav/BrandsNav'
import { BrandsRow } from './BrandsRow/BrandsRow'
import { Button } from '../../shared/components/UI/Buttons/Button/Button'
import { Text } from '../../shared/components/UI/Text/Text'
import { Space } from '../../shared/components/UI/Spacing/Space'
import s from './brands.module.scss'

export const Brands = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const isBrandsPage = location.pathname.slice(1) === 'brands'
	const { brands, loading } = useBrands()

	const refs = brands.reduce((acc, cur) => {
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

	const availableChars = useCallback(() => brands.map((item) => item.name), [brands])

	return (
		<div className='container'>
			<div className={s.block}>
				<div>
					<span className={s.title}>Browse by</span>
					<div className={s.actions}>
						<Button type={isBrandsPage ? 'secondary' : 'submit'} onClick={handleCategoriesNavigate}>
							<Text span className={s.secondary_text}>
								Categories
							</Text>
						</Button>
						<Button type={isBrandsPage ? 'submit' : 'secondary'} onClick={handleBrandsNavigate}>
							<Text span color='white'>
								Brands
							</Text>
						</Button>
						<BrandsNav chars={availableChars()} onClick={handleCharAnchorClick} />
					</div>
				</div>
				<nav className={s.nav}>
					{loading && <div>loading...</div>}
					{brands.map((item) => (
						<BrandsRow {...item} key={item.name} rowRef={refs[item.name]} />
					))}
				</nav>
			</div>
			<Space size='l' />
		</div>
	)
}
