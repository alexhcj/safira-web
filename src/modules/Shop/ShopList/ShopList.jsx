import React, { useContext } from 'react'
import cn from 'classnames'
import { ProductCard } from '../../../components/ProductCard/ProductCard'
import { ProductsNotFound } from './ProductsNotFound/ProductsNotFound'
import { GridContext } from '../Shop'
import { ShopLayoutTypes } from '../ShopListLayout/ShopListLayout'
import s from './shop-list.module.scss'

export const ShopList = ({ products }) => {
	const { productsGrid } = useContext(GridContext)

	// TODO: add animation grid change (grid)
	return (
		<div className={cn(s.grid, s[`${productsGrid}`])}>
			{products ? (
				products.map((product, index) => (
					<ProductCard
						key={index}
						product={product}
						size={productsGrid === ShopLayoutTypes[2].type ? 'row' : 'large'}
						imgSize='md'
					/>))
			) : (
				<ProductsNotFound />
			)}
		</div>
	)
}
