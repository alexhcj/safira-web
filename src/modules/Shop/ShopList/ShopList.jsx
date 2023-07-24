import React from 'react'
import { ProductCard } from '../../../components/ProductCard/ProductCard'
import { ProductsNotFound } from './ProductsNotFound/ProductsNotFound'
import s from './shop-list.module.scss'

export const ShopList = ({ products }) => {
	return (
		<div className={s.items}>
			{products ? (products.map((product, index) => {
				return (
					<div className={s.col} key={index}>
						<ProductCard product={product} size='large' imgSize='md' />
					</div>
				)
			})) : (
				<ProductsNotFound />
			)}
		</div>
	)
}
