import React from 'react'
import cn from 'classnames'
import { gridTypes, useGridContext } from '../../../context/GridContext'
import { ProductCard } from '../../../components/ProductCard/ProductCard'
import { Preloader } from '../../../shared/components/common/Preloader/Preloader'
import s from './shop-list.module.scss'

export const ShopList = ({ products, loading }) => {
	const { grid } = useGridContext()

	// TODO: add animation grid change (grid)
	return (
		<div className={cn(s.grid, s[`${grid}`])}>
			{loading && <Preloader />}
			{products.map((product, index) => (
				<ProductCard key={index} product={product} size={grid === gridTypes[2].type ? 'row' : 'lg'} imgSize='md' />
			))}
		</div>
	)
}
